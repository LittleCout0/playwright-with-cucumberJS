const { When, Then } = require("@cucumber/cucumber")
const { InventoryPage } = require("../page-objects/inventory-page")

const inventoryPage = new InventoryPage()

When('I click in {string} button on any product', async function (textButton) {
    this.buttonsQuantity = await inventoryPage.clickAllButtonsByText(textButton)
})


Then('I should see the quantity increase on shopping cart badge', async function () {
    await inventoryPage.assertShoppingCartQuantity(this.buttonsQuantity)
})


Then('I should see the shopping cart badge empty', async function () {
    await inventoryPage.assertShoppingCartQuantityIsEmpty()
})

When('I choose sort products by name descending', async function () {
    this.productNameBeforeSort = await inventoryPage.getFirstProductNameFromList()
    await inventoryPage.selectOptionToSortBy(sortBy = 'nameDesc')
})

Then('I should see the last product be the first one', async function () {
    let productNameAfterSort = await inventoryPage.getFirstProductNameFromList()
    inventoryPage.assertDifferenceBetweenProducts(this.productNameBeforeSort, productNameAfterSort)
})

When('I choose sort products by value \\(min to max)', async function () {
    await inventoryPage.selectOptionToSortBy(sortBy = 'minValue')
})

Then('I should see the first product be the most cheaper', async function () {
    await inventoryPage.assertFirstProductHasLowerValue()
})

When('I choose sort products by value \\(max to min)', async function () {
    await inventoryPage.selectOptionToSortBy(sortBy = 'maxValue')
})

Then('I should see the first product be the most expensive', async function () {
    await inventoryPage.assertFirstProductHasHighestValue()
})

When('I click on a product name', async function () {
    this.productDetails = await inventoryPage.getFirstProductDetailsFromList()
    this.productValue = await inventoryPage.getFirstProductValueFromList()
    await inventoryPage.clickOnProductLink()
})

Then('I should see another page with product details', async function () {
    let productDetailsUniquePage = await inventoryPage.getProductDetailsFromUniquePage()
    let productValueUniquePage = await inventoryPage.getProductValueFromUniquePage()

    inventoryPage.assertProductDetailsTextAreTheSame(this.productDetails, productDetailsUniquePage)
    inventoryPage.assertProductValueAreTheSame(this.productValue, productValueUniquePage)
})