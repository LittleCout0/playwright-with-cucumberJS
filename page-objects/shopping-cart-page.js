const
    cartProductDetailClass = '.inventory_item_desc',
    cartProductValueClass = '.inventory_item_price',
    cartButton = '.shopping_cart_link',
    returnButtonText = 'Continue Shopping',
    removeButtonText = 'Remove',
    cartTitleClass = '.title',
    cartTitleText = 'Your Cart',
    removeElementClass = '.removed_cart_item',
    checkoutButtonText = 'checkout'


class ShoppingCartPage {

    async getProductDetailFromShoppingCart() {
        return await page.locator(cartProductDetailClass).textContent()
    }

    async getProductValueFromShoppingCart() {
        let item = await page.locator(cartProductValueClass).textContent()
        return parseFloat(item.replace('$', ''))
    }

    async clickShoppingCartButton() {
        await page.locator(cartButton).click()
    }

    async clickContinueShoppingButton() {
        await page.locator('button', { hasText: returnButtonText }).click()
    }

    async clickRemoveFirstItemFromCart() {
        let itemBtn = await page.locator('button', { hasText: removeButtonText }).first()
        await itemBtn.click()
    }

    async clickCheckoutButton(){
        await page.locator('button', {hasText: checkoutButtonText}).click()
    }

    // Assertions

    async assertIsShoppingCartPage() {
        let title = await page.locator(cartTitleClass).textContent()
        expect(title).to.equal(cartTitleText)
    }

    async assertShoppingCartIsEmpty() {
        let isShoppingCartPageEmpty = await page.locator(removeElementClass).isVisible()
        expect(isShoppingCartPageEmpty).to.equal(false)
    }

}

module.exports = { ShoppingCartPage }