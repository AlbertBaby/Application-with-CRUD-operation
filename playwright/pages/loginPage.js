import BasePage from './basePage'
import { baseUrl } from '../config'
import { loginSelectors } from '../pageobjects/loginPage'
import { expect } from '@playwright/test'
import fs from 'fs'

const testData = JSON.parse(fs.readFileSync('./data/loginTestData.json', 'utf-8'))

class LoginPage extends BasePage {
    constructor(page) {
        super(page)
    }

    async openApp() {
        await super.open(testData.urls.baseUrl)
        return await super.waitForPageLoad()
    }

    async usernameFieldVisible() {
        return await this.isElementVisible(loginSelectors.usernameInput)
    }

    async passwordFieldVisible() {
        return await this.isElementVisible(loginSelectors.passwordInput)
    }

    async loginButtonVisible() {
        return await this.isElementVisible(loginSelectors.loginButton)
    }

    async loginAsValidUser() {
        await this.waitAndFill(loginSelectors.usernameInput, testData.validUser.username)
        await this.waitAndFill(loginSelectors.passwordInput, testData.validUser.password)
        await this.waitAndClick(loginSelectors.loginButton)
    }

    async loginAsInvalidUser() {
        await this.waitAndFill(loginSelectors.usernameInput, testData.invalidUser.username)
        await this.waitAndFill(loginSelectors.passwordInput, testData.invalidUser.password)
        await this.waitAndClick(loginSelectors.loginButton)
    }

    async login(username, password) {
        await this.waitAndFill(loginSelectors.usernameInput, username)
        await this.waitAndFill(loginSelectors.passwordInput, password)
        await this.waitAndClick(loginSelectors.loginButton)
    }

    async getErrorMessage() {
        return await this.getTextFromElement(loginSelectors.errorMessage)
    }

    async isLoginButtonDisabled() {
        const button = await this.page.$(loginSelectors.loginButton)
        return await button.isDisabled()
    }

    async getLocalStorage(key) {
        return await this.page.evaluate((k) => localStorage.getItem(k), key)
    }

    async enterCredentials(username, password) {
        await this.waitAndFill(loginSelectors.usernameInput, username)
        await this.waitAndFill(loginSelectors.passwordInput, password)
    }

    async getUsernameValue() {
        const element = await this.page.$(loginSelectors.usernameInput)
        return await element.inputValue()
    }

    async getPasswordValue() {
        const element = await this.page.$(loginSelectors.passwordInput)
        return await element.inputValue()
    }

    async clickOnRegisterButton() {
        await this.waitAndClick(loginSelectors.registerLink)
    }

    async getTextFromElement(selector) {
        return await this.page.textContent(selector)
    }

    async getUrl() {
        return super.getUrl()
    }

    async getTitle() {
        return super.getTitle()
    }


	async clickOnRegisterButton() {
		await this.waitAndClick(loginSelectors.links.register)
	}

    async verifyUserSuccessfullyLoggedIn() {
        return await this.isElementVisible(loginSelectors.dashboard)
    }

	async verifyInvalidUserNotLoggedIn() {
		 const errorMessage = await loginPage.getTextFromElement(selectors.messages.error);
        expect(errorMessage).toContain(testData.expectedMessages.errorMessage);
        expect(await this.page.getUrl()).toContain(testData.urls.baseUrl);
	}

	async verifyValidLoginPageTitle() {
		const title = await this.getTitle()
		expect(title).toBe(testData.expectedMessages.pageTitle)
	}

	async verifyRegistrationPageUrl() {
		const url = await this.getUrl()
		expect(url).toContain(testData.urls.registerPath)
	}

	async createNewUser() {
		await this.waitAndFill(loginSelectors.inputs.username, this.createRandomString(8))
		await this.waitAndFill(loginSelectors.inputs.password, testData.newUser.password)
		await this.waitAndFill(loginSelectors.inputs.confirmPassword, testData.newUser.password)
		await this.waitAndClick(loginSelectors.register)
	}

	async verifySuccessfullRegistration(){
		const successMessage = await this.getTextFromElement(loginSelectors.messages.success)
		expect(successMessage).toContain(testData.expectedMessages.registrationSuccess)
		const url = await this.getUrl()
		expect(url).toContain(testData.urls.loginPath)
	}
}

export default LoginPage