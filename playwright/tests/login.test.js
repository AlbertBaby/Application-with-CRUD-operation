import test from '../testFixtures/fixture'
import { baseUrl } from '../config'

test.describe('Authentication Flows', () => {
    test.beforeEach(async ({ page, loginPage }) => {
        // Ensure we start fresh
        await page.context().clearCookies()
        // Navigate to the application
        await loginPage.openApp()
        // Verify we're on the login page
        await page.waitForURL(baseUrl)
    });
    test('Login Flow', async ({ loginPage }) => {
        await test.step('Login with existing user', async () => {
            await loginPage.login();
            await loginPage.verifyDashboard();
            await loginPage.logout();
            await loginPage.verifyLoginPage();
        });
    });

    test('Registration and Login Flow', async ({ loginPage }) => {
        await test.step('Register new user and login', async () => {
            const username = await loginPage.register();
            await loginPage.verifyRegistrationSuccess();
            await loginPage.login(username, 'test1');
            await loginPage.verifyDashboard();
            await loginPage.verifyNoProducts();
        });
    });

    test('Should show error with invalid credentials', async ({ loginPage }) => {
        await test.step('Login with invalid credentials', async () => {
            await loginPage.loginAsInvalidUser();
            await loginPage.verifyLoginError();
        });
    });

    test('Should validate required fields', async ({ loginPage }) => {
        await test.step('Try to login with empty fields', async () => {
            await loginPage.login('', '');
            await loginPage.verifyLoginButtonDisabled();
        });
    });

    test('Should navigate to registration page', async ({ loginPage }) => {
        await test.step('Click on registration link', async () => {
            await loginPage.clickOnRegisterButton();
            await loginPage.verifyRegistrationPage();
        });
    });
});
