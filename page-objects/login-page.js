class LoginPage {

    get login() {
        return {
            homepageUrl: 'https://www.saucedemo.com',
            usernameField: '#user-name',
            validUser: 'standard_user',
            passwordField: '#password',
            validPassword: 'secret_sauce',
            lockedUser: 'locked_out_user',
            loginButton: '#login-button',
            sideMenuButton: '#react-burger-menu-btn',
            logoutLink: '#logout_sidebar_link',
            errorMessagePopup: "data-test=error",
            lockedErrorMessage: "Epic sadface: Sorry, this user has been locked out.",
            loginErrorMessage: "Epic sadface: Username and password do not match any user in this service",
            logoLogin: '.login_logo'
        }
    }
    async navigateToLoginScreen() {
        await page.goto(this.login.homepageUrl)
    }

    async submitLoginForm() {
        await page.locator(this.login.usernameField).fill(this.login.validUser)
        await page.locator(this.login.passwordField).fill(this.login.validPassword)
        await page.locator(this.login.loginButton).click()
    }


    async validLogin() {
        await this.navigateToLoginScreen()
        await this.submitLoginForm()
    }

    async logout() {
        await page.locator(this.login.sideMenuButton).click()
        await page.locator(this.login.logoutLink).click()
    }

    async submitLoginWithParameters(username, password) {
        await page.locator(this.login.usernameField).fill(username)
        await page.locator(this.login.passwordField).fill(password)
        await page.locator(this.login.loginButton).click()
    }

    async submitLoginFormLockedCredentials() {
        await page.locator(this.login.usernameField).fill(this.login.lockedUser)
        await page.locator(this.login.passwordField).fill(this.login.validPassword)
        await page.locator(this.login.loginButton).click()
    }

    // Assertions
    async assertLoginErrorMessage(errorType) {

        let errorMessage
        if (errorType === 'lockCredentials') {
            errorMessage = this.login.lockedErrorMessage
        }
        else if (errorType === 'failedLogin') {
            errorMessage = this.login.loginErrorMessage
        }

        let errorText = await page.locator(this.login.errorMessagePopup).textContent()
        expect(errorText, `Error message should be ${errorMessage}`).to.equal(errorMessage)
    }

    async assertIsInLoginPage() {
        await page.waitForSelector(this.login.logoLogin)
    }
}

module.exports = { LoginPage }