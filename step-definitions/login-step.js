const { Given, When, Then } = require("@cucumber/cucumber")
const { LoginPage } = require("../page-objects/login-page")
const { InventoryPage } = require("../page-objects/inventory-page")

const loginPage = new LoginPage()
const inventoryPage = new InventoryPage()

Given('I visit the login page', async function () {
    await loginPage.navigateToLoginScreen()
})

When('I fill the form with valid credentials', async function () {
    await loginPage.submitLoginForm()
})

Then('I should see the inventory page', async function () {
    await inventoryPage.assertUserIsInInventoryPage()
})

When(/^I fill the form with "([^"]*)" and "([^"]*)"$/, async function (username, password) {
    await loginPage.submitLoginWithParameters(username, password)
})

Then('a credential error message should be displayed', async function () {
    await loginPage.assertLoginErrorMessage(errorType = 'failedLogin')
})

When('I fill the form with a locked credentials', async function () {
    await loginPage.submitLoginFormLockedCredentials()
})

Then('an error message should be displayed', async function () {
    await loginPage.assertLoginErrorMessage(errorType = 'lockCredentials')
})

Given('I am in the inventory page', async function () {
    await inventoryPage.assertUserIsInInventoryPage()
})

When('I click the logout button', async function () {
    await loginPage.logout()
})

Then('I should see the login page', async function () {
    await loginPage.assertIsInLoginPage()
})