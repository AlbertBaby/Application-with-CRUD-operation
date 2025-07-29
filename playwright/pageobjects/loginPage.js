// Login page selectors
export const loginSelectors = {
    usernameInput: "[name=\"username\"]",
    passwordInput: "[name=\"password\"]",
    loginButton: "button[class*=\"MuiButton-containedPrimary\"]",
    errorMessage: "[class=\"swal-text\"]",
    registerLink: '[class="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiLink-button MuiTypography-colorPrimary"]',
    dashboard: '[data-testid="dashboard"]',
    register: '[class="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiLink-button MuiTypography-colorPrimary"]',
    pageTitle: 'User Login/Register'
};

export const loginData = {
    validUserName: 'standard_user',
    invalidUserName: 'problem_user',
}
