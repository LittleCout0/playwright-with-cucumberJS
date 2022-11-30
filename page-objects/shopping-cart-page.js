class ShoppingCartPage {

    get shoppingCart() {
        return {
            productDetail: '.inventory_item_desc',
            productValue: '.inventory_item_price',
            cartButton: '.shopping_cart_link',
            returnButtonTxt: 'Continue Shopping',
            removeButtonTxt: 'Remove',
            title: '.title',
            titleTxt: 'Your Cart',
            removeItem: '.removed_cart_item',
            checkoutButtonTxt: 'checkout'
        }
    }

    async getProductDetailFromShoppingCart() {
        return await page.locator(this.shoppingCart.productDetail).textContent()
    }

    async getProductValueFromShoppingCart() {
        let itemValue = await page.locator(this.shoppingCart.productValue).textContent()
        return parseFloat(itemValue.replace('$', ''))
    }

    async clickShoppingCartButton() {
        await page.locator(this.shoppingCart.cartButton).click()
    }

    async clickContinueShoppingButton() {
        await page.locator('button', { hasText: this.shoppingCart.returnButtonTxt }).click()
    }

    async clickRemoveFirstItemFromCart() {
        await page.locator('button', { hasText: this.shoppingCart.removeButtonTxt }).first().click()
    }

    async clickCheckoutButton() {
        await page.locator('button', { hasText: this.shoppingCart.checkoutButtonTxt }).click()
    }

    // Assertions

    async assertIsShoppingCartPage() {
        let title = await page.locator(this.shoppingCart.title).textContent()
        expect(title, `Title from Shopping Cart should be "${this.shoppingCart.titleTxt}"`).to.equal(this.shoppingCart.titleTxt)
    }

    async assertShoppingCartIsEmpty() {
        let isShoppingCartPageEmpty = await page.locator(this.shoppingCart.removeItem).isVisible()
        expect(isShoppingCartPageEmpty, "Shopping Cart should be empty").to.equal(false)
    }

}

module.exports = { ShoppingCartPage }