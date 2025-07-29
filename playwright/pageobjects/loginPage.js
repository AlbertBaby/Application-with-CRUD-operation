export const loginSelectors = {
    // Login page
    usernameInput: "[placeholder='User Name']",
    passwordInput: "[placeholder='Password']",
    loginButton: "button:has-text('Login')",
    
    // Dashboard elements
    dashboardHeading: "h2:has-text('Dashboard')",
    descriptionHeader: "th:has-text('Description')",
    logoutButton: "button:has-text('Log Out')",
    noProductMessage: "text='There is no product!'",
    okButton: "button:has-text('OK')",
    
    // Registration
    registerButton: "button:has-text('Register')",
    confirmPasswordInput: "[placeholder='Confirm Password']",
    registrationSuccessMessage: "text='Registered Successfully.'"
};

export const loginData = {
    username: 'test1',
    password: 'test1',
}
