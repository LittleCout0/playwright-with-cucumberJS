class LoginPage {

    async navigateToLoginScreen() {
        await page.goto("https://www.saucedemo.com")
    }

    async submitLoginForm() {
        await page.fill('#user-name', 'standard_user')
        await page.fill('#password', 'secret_sauce')
        await page.click('#login-button')
    }


    async validLogin() {
        await this.navigateToLoginScreen()
        await this.submitLoginForm()
    }

    async logout() {
        await page.click('#react-burger-menu-btn')
        await page.click('#logout_sidebar_link')
    }

    async submitLoginWithParameters(username, password) {
        await page.fill('#user-name', username)
        await page.fill('#password', password)
        await page.click('#login-button')
    }

    async submitLoginFormLockedCredentials() {
        await page.fill('#user-name', 'locked_out_user')
        await page.fill('#password', 'secret_sauce')
        await page.click('#login-button')
    }

    
    async assertLoginErrorMessage(error_type) {

        let errorMessage
        if (error_type === 'lock_credentials') {
            errorMessage = "Epic sadface: Sorry, this user has been locked out."
        }
        else if (error_type === 'failed_login') {
            errorMessage = "Epic sadface: Username and password do not match any user in this service"
        }

        let errorText = await page.locator("data-test=error").textContent()
        expect(errorText).to.equal(errorMessage)
    }

    async assertIsInLoginPage(){
        await page.waitForSelector('.login_logo')    
    }
}

module.exports = { LoginPage }