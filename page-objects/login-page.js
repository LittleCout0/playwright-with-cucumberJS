const
    website = 'https://www.saucedemo.com',
    usernameField = '#user-name',
    validUser = 'standard_user',
    passwordField = '#password',
    validPassword = 'secret_sauce',
    lockedUser = 'locked_out_user',
    loginBtn = '#login-button',
    sideMenuBtn = '#react-burger-menu-btn',
    logoutLink = '#logout_sidebar_link',
    errorMessagePopup = "data-test=error",
    lockedErrorMessage = "Epic sadface: Sorry, this user has been locked out.",
    loginErrorMessage = "Epic sadface: Username and password do not match any user in this service",
    logoLoginPageClass = '.login_logo'


class LoginPage {

    async navigateToLoginScreen() {
        await page.goto(website)
    }

    async submitLoginForm() {
        await page.fill(usernameField, validUser)
        await page.fill(passwordField, validPassword)
        await page.click(loginBtn)
    }


    async validLogin() {
        await this.navigateToLoginScreen()
        await this.submitLoginForm()
    }

    async logout() {
        await page.click(sideMenuBtn)
        await page.click(logoutLink)
    }

    async submitLoginWithParameters(username, password) {
        await page.fill(usernameField, username)
        await page.fill(passwordField, password)
        await page.click(loginBtn)
    }

    async submitLoginFormLockedCredentials() {
        await page.fill(usernameField, lockedUser)
        await page.fill(passwordField, validPassword)
        await page.click(loginBtn)
    }

    // Assertions
    async assertLoginErrorMessage(error_type) {

        let errorMessage
        if (error_type === 'lockCredentials') {
            errorMessage = lockedErrorMessage
        }
        else if (error_type === 'failedLogin') {
            errorMessage = loginErrorMessage
        }

        let errorText = await page.locator(errorMessagePopup).textContent()
        expect(errorText).to.equal(errorMessage)
    }

    async assertIsInLoginPage() {
        await page.waitForSelector(logoLoginPageClass)
    }
}

module.exports = { LoginPage }