const { Given, When, Then } = require("@cucumber/cucumber")

const { CheckoutPage } = require("../page-objects/checkout-page")
const { InventoryPage } = require("../page-objects/inventory-page")
const { ShoppingCartPage } = require("../page-objects/shopping-cart-page")
const checkoutPage = new CheckoutPage()
const cartPage = new ShoppingCartPage()
const inventoryPage = new InventoryPage()

Given('I am in the checkout page', async function () {
    await checkoutPage.assertIsCheckoutPage()
})

When('I click in Continue button', async function () {
    await checkoutPage.clickContinueCheckoutButton()
})

Then('I should see an error message {string}', async function (errorMessage) {
    await checkoutPage.assertErrorMessage(errorMessage)
})

Given('I fill First Name field only', async function () {
    await checkoutPage.fillFirstNameField()
})

Given('I only unfilled Postal Code field', async function () {
    await checkoutPage.fillFirstNameField()
    await checkoutPage.fillLastNameField()
})

Given('I have a product to buy', async function () {
    this.productDetail = await cartPage.getProductDetailFromShoppingCart()
    this.productValue = await cartPage.getProductValueFromShoppingCart()
})

Given('I go to checkout page', async function () {
    await cartPage.clickCheckoutButton()
    await checkoutPage.assertIsCheckoutPage()
})

Given('I fill all the fields corretly', async function () {
    await checkoutPage.fillCheckoutFields()
})

When('I click on Checkout button', async function () {
    await checkoutPage.clickContinueCheckoutButton()
})

Then('I should see the Checkout Overview page', async function () {
    await checkoutPage.assertIsCheckoutOverviewPage()
})

Then('the product I choose has same data from shopping cart', async function () {
    let productDetailCheckoutOverview = await checkoutPage.getProductDetailFromCheckoutOverview()
    let productValueCheckoutOverview = await checkoutPage.getProductValueFromCheckoutOverview()

    inventoryPage.assertProductDetailsTextAreTheSame(this.productDetail, productDetailCheckoutOverview)
    inventoryPage.assertProductValueAreTheSame(this.productValue, productValueCheckoutOverview)
})

Then('subtotal is equal to sum of all products value', async function () {
    await checkoutPage.assertSubtTotalEqualToSumProductsValue()
})

Given('I am in the checkout overview page', async function () {
    await checkoutPage.assertIsCheckoutOverviewPage()
})

When('I click on Finish button', async function () {
    await checkoutPage.clickFinishButton()
})

Then('I should see a title message', async function () {
    await checkoutPage.assertSuccessText()
})
