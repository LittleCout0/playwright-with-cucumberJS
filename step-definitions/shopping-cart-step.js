const { Given, When, Then, BeforeAll } = require('@cucumber/cucumber')
const { ShoppingCartPage } = require('../page-objects/shopping-cart-page')
const { InventoryPage } = require("../page-objects/inventory-page")

const cartPage = new ShoppingCartPage()
const inventoryPage = new InventoryPage()


Given('I am in the shopping cart page', async function () {
    await cartPage.assertIsShoppingCartPage()
})

When('I click in {string} button of a product', async function (textButton) {
    this.productDetailInventory = await inventoryPage.getFirstProductDetailsFromList()
    this.productValueInventory = await inventoryPage.getFirstProductValueFromList()
    await inventoryPage.clickFirstProductToAdd(textButton)
})

When('I click on shopping cart button', async function () {
    await cartPage.clickShoppingCartButton()
})


Then('I should see the same product in shopping cart page', async function () {
    let productValueCart = await cartPage.getProductValueFromShoppingCart()
    let productDetailCart = await cartPage.getProductDetailFromShoppingCart()

    inventoryPage.assertProductValueAreTheSame(this.productValueInventory, productValueCart)
    inventoryPage.assertProductDetailsTextAreTheSame(this.productDetailInventory, productDetailCart)
})

When('I click on Continue Shoppging button', async function () {
    await cartPage.clickContinueShoppingButton()
})

When('I click on Remove button', async function () {
    await cartPage.clickRemoveFirstItemFromCart()
})

Then('I should see the shopping cart page empty', async function () {
    await cartPage.assertShoppingCartIsEmpty()
})