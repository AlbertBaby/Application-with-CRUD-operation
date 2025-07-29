import test from '../testFixtures/fixture'
import { loginSelectors } from '../pageobjects/loginPage'
import fs from 'fs'
import { expect } from '@playwright/test'

// Import test data
const testData = JSON.parse(fs.readFileSync('./data/loginTestData.json', 'utf-8'))

test.describe('Login Page Test Cases', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.openApp();
    });

    test('Should display login page with all elements', async ({ loginPage }) => {
        await test.step('Verify login page elements are visible', async () => {
            // Verify title
            expect(await loginPage.getTitle()).toBe(testData.expectedMessages.pageTitle);
            
            // Verify form elements
            expect(await loginPage.usernameFieldVisible()).toBeTruthy();
            expect(await loginPage.passwordFieldVisible()).toBeTruthy();
            expect(await loginPage.loginButtonVisible()).toBeTruthy();
        });
    });

    test('Should login successfully with valid credentials', async ({ loginPage }) => {
        await test.step('Login with valid credentials', async () => {
            await loginPage.loginAsValidUser();
            // Verify redirect to dashboard
            expect(await loginPage.getUrl()).toContain('/dashboard');
            // Verify local storage has token
            expect(await loginPage.getLocalStorage('token')).toBeTruthy();
            expect(await loginPage.getLocalStorage('user_id')).toBeTruthy();
        });
    });

    test('Should show error with invalid credentials', async ({ loginPage }) => {
        await test.step('Login with invalid credentials', async () => {
            await loginPage.loginAsInvalidUser();
            // Verify error message
            expect(await loginPage.getErrorMessage()).toBe(testData.expectedMessages.errorMessage);
            // Verify still on login page
            expect(await loginPage.getUrl()).not.toContain('/dashboard');
        });
    });

    test('Should validate required fields', async ({ loginPage }) => {
        await test.step('Try to login with empty fields', async () => {
            await loginPage.login('', '');
            // Verify field validations
            expect(await loginPage.isLoginButtonDisabled()).toBeTruthy();
        });
    });

    test('Should navigate to registration page', async ({ loginPage }) => {
        await test.step('Click on registration link', async () => {
            await loginPage.clickOnRegisterButton();
            expect(await loginPage.getUrl()).toContain(testData.urls.registerPath);
        });
    });

    test('Should maintain form state', async ({ loginPage }) => {
        await test.step('Enter credentials but do not submit', async () => {
            const testUsername = 'testuser';
            const testPassword = 'testpass';
            
            await loginPage.enterCredentials(testUsername, testPassword);
            
            // Verify values are maintained
            expect(await loginPage.getUsernameValue()).toBe(testUsername);
            expect(await loginPage.getPasswordValue()).toBe(testPassword);
        });
    });
});
