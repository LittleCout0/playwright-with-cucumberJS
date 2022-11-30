class InventoryPage {
    get inventory() {
        return {
            title: '.title',
            titleTxt: 'Products',
            item: '.inventory_item',
            itemName: '.inventory_item_name',
            itemPrice: '.inventory_item_price',
            itemDetail: '.inventory_item_desc',
            shoppingCartBadge: '.shopping_cart_badge',
            dropDownSortOptions: 'data-test=product_sort_container',
            itemDetailLargeDesc: '.inventory_details_desc.large_size',
            itemDetailPrice: '.inventory_details_price'
        }
    }

    get sortBy() {
        return {
            nameAscending: 'az',
            nameDescending: 'za',
            minimalValue: 'lohi',
            maximalValue: 'hilo',
        }
    }


    async clickAllButtonsByText(textButton) {
        let inventory = await page.locator(this.inventory.item)

        for (let i = 0; i < await inventory.count(); i++) {
            let btn = await page.locator('button', { hasText: textButton }).first()
            await btn.click()
        }
        return await inventory.count()
    }

    async clickFirstProductToAdd(textButton) {
        await page.locator('button', { hasText: textButton }).first().click()
    }

    async selectOptionToSortBy(sortBy) {
        switch (sortBy) {
            case 'nameDesc':
                await page.locator(this.inventory.dropDownSortOptions).selectOption(this.sortBy.nameDescending)
                break
            case 'minValue':
                await page.locator(this.inventory.dropDownSortOptions).selectOption(this.sortBy.minimalValue)
                break
            case 'maxValue':
                await page.locator(this.inventory.dropDownSortOptions).selectOption(this.sortBy.maximalValue)
                break
            default:
                await page.locator(this.inventory.dropDownSortOptions).selectOption(this.sortBy.nameAscending)
                break
        }
    }

    async getFirstProductNameFromList() {
        return await page.locator(this.inventory.itemName).first().textContent()
    }

    async getFirstProductValueFromList() {
        let itemValue = await page.locator(this.inventory.itemPrice).first().textContent()
        return parseFloat(itemValue.replace('$', ''))
    }

    async getFirstProductDetailsFromList() {
        return await page.locator(this.inventory.itemDetail).first().textContent()
    }

    async getProductDetailsFromUniquePage() {
        return await page.locator(this.inventory.itemDetailLargeDesc).textContent()
    }

    async getProductValueFromUniquePage() {
        let itemValue = await page.locator(this.inventory.itemDetailPrice).textContent()
        return parseFloat(itemValue.replace('$', ''))
    }

    async clickOnProductLink() {
        await page.locator(this.inventory.itemName).first().click()
    }

    async getAllProductsValues() {
        let _arrValues = []
        for (let i = 0; i < await page.locator(this.inventory.itemPrice).count() - 1; i++) {
            let _value = await page.locator(this.inventory.itemPrice).nth(i).textContent()
            _arrValues.push(parseFloat(_value.replace('$', '')))
        }
        return _arrValues
    }

    // Assertions

    async assertUserIsInInventoryPage() {
        let title = await page.locator(this.inventory.title).textContent()
        expect(title, `Title from Inventory Page should be "${this.inventory.titleTxt}"`).to.equal(this.inventory.titleTxt)
    }

    async assertShoppingCartQuantity(quantity) {
        let shoppingCartQtt = await page.locator(this.inventory.shoppingCartBadge).textContent()
        expect(parseInt(shoppingCartQtt), `Quantity of items in cart should be ${quantity}`).to.equal(quantity)
    }

    async assertShoppingCartQuantityIsEmpty() {
        let isShoppingCartBadgeVisible = await page.locator(this.inventory.shoppingCartBadge).isVisible()
        expect(isShoppingCartBadgeVisible, "Cart quantity badge should not be visible").to.equal(false)
    }

    assertDifferenceBetweenProducts(firstProduct, secondProduct) {
        expect(firstProduct, "Products should not be equal").to.not.equal(secondProduct)
    }

    async assertFirstProductHasLowerValue() {
        let _arr = await this.getAllProductsValues()
        let productValue = await this.getFirstProductValueFromList()
        expect(Math.min(..._arr), "First product in list should have lowest price").to.equal(productValue)
    }

    async assertFirstProductHasHighestValue() {
        let _arr = await this.getAllProductsValues()
        let productValue = await this.getFirstProductValueFromList()
        expect(Math.max(..._arr), "First product in list should have highest price").to.equal(productValue)
    }

    assertProductDetailsTextAreTheSame(firstText, secondText) {
        expect(firstText, "Detail text should be the same").to.equal(secondText)
    }

    assertProductValueAreTheSame(firstValue, secondValue) {
        expect(firstValue, "Values should be the same").to.equal(secondValue)
    }
}

module.exports = { InventoryPage }