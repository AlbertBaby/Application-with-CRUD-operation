import BasePage from './basePage'
import { loginSelectors } from '../pageobjects/loginPage'
import { baseUrl } from '../config'
import { expect } from '@playwright/test'

export default class LoginPage extends BasePage {
    constructor(page) {
        super(page)
    }

    async openApp() {
        await this.page.goto(baseUrl)
        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL(new RegExp(baseUrl))
    }

    async login(username = 'test1', password = 'test1') {
        await this.page.fill(loginSelectors.usernameInput, username)
        await this.page.keyboard.press('Tab')
        await this.page.fill(loginSelectors.passwordInput, password)
        const loginButton = this.page.locator(loginSelectors.loginButton)
        await expect(loginButton).toBeEnabled()
        await loginButton.click()
    }

    async loginAsInvalidUser() {
        await this.login('invalid_user', 'invalid_password')
    }

    async verifyLoginError() {
        const errorMessage = await this.page.locator(loginSelectors.errorMessage)
        await expect(errorMessage).toBeVisible()
        await expect(errorMessage).toHaveText('Username or password is incorrect!')
        await expect(this.page).not.toHaveURL(/.*\/dashboard/)
        await expect(this.page).toHaveURL(new RegExp(baseUrl))
    }

    async verifyLoginPage() {
        await expect(this.page).toHaveURL(new RegExp(baseUrl))
        await expect(this.page.locator(loginSelectors.loginButton)).toBeVisible()
    }

    async verifyLoginButtonDisabled() {
        await expect(this.page.locator(loginSelectors.loginButton)).toBeDisabled()
    }

    async verifyRegistrationPage() {
        await expect(this.page).toHaveURL(/.*\/register/)
        await expect(this.page.locator(loginSelectors.registerButton)).toBeVisible()
    }

    async verifyDashboard() {
        // Use RegExp for more flexible URL matching
        await expect(this.page).toHaveURL(/.*\/dashboard/)
        await expect(this.page.locator(loginSelectors.dashboardHeading)).toBeVisible()
        await this.page.click(loginSelectors.descriptionHeader)
    }

    async logout() {
        await this.page.click(loginSelectors.logoutButton)
        await expect(this.page).toHaveURL(new RegExp(baseUrl))
    }

    generateUniqueUsername() {
        return `test_${Date.now()}`
    }

    async register() {
        const uniqueUsername = this.generateUniqueUsername()
        await this.clickOnRegisterButton()
        await this.page.fill(loginSelectors.usernameInput, uniqueUsername)
        await this.page.fill(loginSelectors.passwordInput, 'test1')
        await this.page.fill(loginSelectors.confirmPasswordInput, 'test1')
        await this.page.click(loginSelectors.registerButton)
        return uniqueUsername
    }

    async clickOnRegisterButton() {
        await this.page.click(loginSelectors.registerButton)
        await expect(this.page).toHaveURL(/.*\/register/)
    }

    async verifyRegistrationSuccess() {
        await expect(this.page.locator(loginSelectors.registrationSuccessMessage)).toBeVisible()
        await this.page.click(loginSelectors.okButton)
        await expect(this.page).toHaveURL(new RegExp(baseUrl))
    }

    async verifyNoProducts() {
        await expect(this.page.locator(loginSelectors.noProductMessage)).toBeVisible()
        await this.page.click(loginSelectors.okButton)
    }
}