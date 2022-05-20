const
    titleClass = '.title',
    titlePage = 'Products',
    inventoryClass = '.inventory_item',
    inventoryItemsNamesClass = '.inventory_item_name',
    inventoryItemsValuesClass = '.inventory_item_price',
    inventoryItemsDetailClass = '.inventory_item_desc',
    shoppingCartBadgeClass = '.shopping_cart_badge',
    dropDownSortBy = "data-test=product_sort_container",
    sortByNameAscending = 'az',
    sortByNameDescending = 'za',
    sortByMinimalValue = 'lohi',
    sortByMaximalValue = 'hilo',
    inventoryItemDetailUniquePage = '.inventory_details_desc.large_size',
    inventoryItemValueUniquePage = '.inventory_details_price'

class InventoryPage {

    async clickAllButtonsByText(textButton) {
        let invent = await page.locator(inventoryClass)

        for (let i = 0; i < await invent.count(); i++) {
            let btn = await page.locator('button', { hasText: textButton }).first()
            await btn.click()
        }
        return await invent.count()
    }

    async clickFirstProductToAdd(textButton){
        let item = await page.locator('button', { hasText: textButton }).first()
        await item.click()
    }

    async selectOptionToSortBy(sortBy) {
        let dropDown = await page.$(dropDownSortBy)

        if (sortBy === 'nameDesc') {
            await dropDown?.selectOption(sortByNameDescending)
        }
        else if (sortBy === 'minValue') {
            await dropDown?.selectOption(sortByMinimalValue)
        }
        else if (sortBy === 'maxValue') {
            await dropDown?.selectOption(sortByMaximalValue)
        }
        else {
            await dropDown?.selectOption(sortByNameAscending)
        }
    }

    async getFirstProductNameFromList() {
        let firstItem = await page.locator(inventoryItemsNamesClass).first()
        return await firstItem.textContent()
    }

    async getFirstProductValueFromList() {
        let firstItem = await page.locator(inventoryItemsValuesClass).first()
        let _value = await firstItem.textContent()
        return parseFloat(_value.replace('$', ''))
    }

    async getFirstProductDetailsFromList() {
        let firstItem = await page.locator(inventoryItemsDetailClass).first()
        return await firstItem.textContent()
    }

    async getProductDetailsFromUniquePage() {
        let item = await page.locator(inventoryItemDetailUniquePage)
        return await item.textContent()
    }

    async getProductValueFromUniquePage() {
        let item = await page.locator(inventoryItemValueUniquePage)
        let value = await item.textContent()
        return parseFloat(value.replace('$', ''))
    }

    async clickOnProductLink() {
        let product = await page.locator(inventoryItemsNamesClass).first()
        await product.click()
    }

    async getAllProductsValues() {
        let _arrValues = []
        for (let i = 0; i < await page.locator(inventoryItemsValuesClass).count() - 1; i++) {
            let _value = await page.locator(inventoryItemsValuesClass).nth(i).textContent()
            _arrValues.push(parseFloat(_value.replace('$', '')))
        }
        return _arrValues
    }

    // Assertions
    
    async assertUserIsInInventoryPage() {
        let title = await page.locator(titleClass).textContent()
        expect(title).to.equal(titlePage)
    }

    async assertShoppingCartQuantity(quantity) {
        let shoppingCartBadge = await page.locator(shoppingCartBadgeClass).textContent()
        expect(parseInt(shoppingCartBadge)).to.equal(quantity)
    }

    async assertShoppingCartQuantityIsEmpty() {
        let isShoppingCartBadgeVisible = await page.locator(shoppingCartBadgeClass).isVisible()
        expect(isShoppingCartBadgeVisible).to.equal(false)
    }

    assertDifferenceBetweenProducts(firstProduct, secondProduct) {
        expect(firstProduct).to.not.equal(secondProduct)
    }

    async assertFirstProductHasLowerValue() {
        let _arr = await this.getAllProductsValues()
        let productValue = await this.getFirstProductValueFromList()
        expect(Math.min(..._arr)).to.equal(productValue)
    }

    async assertFirstProductHasHighestValue() {
        let _arr = await this.getAllProductsValues()
        let productValue = await this.getFirstProductValueFromList()
        expect(Math.max(..._arr)).to.equal(productValue)
    }

    assertProductDetailsTextAreTheSame(firstText, secondText) {
        expect(firstText).to.equal(secondText)
    }

    assertProductValueAreTheSame(firstValue, secondValue) {
        expect(firstValue).to.equal(secondValue)
    }
}

module.exports = { InventoryPage }