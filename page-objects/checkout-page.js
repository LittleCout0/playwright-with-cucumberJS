class CheckoutPage {
    get checkout() {
        return {
            title: '.title',
            titleTxt: 'Checkout: Your Information',
            firstNameField: 'data-test=firstName',
            lastNameField: 'data-test=lastName',
            postalCodeField: 'data-test=postalCode',
            continueButton: 'data-test=continue',
            overviewInventoryDesc: '.inventory_item_desc',
            overviewInventoryValue: '.inventory_item_price',
            summarySubTotalValue: '.summary_subtotal_label',
            errorMessage: 'data-test=error',
            overviewTitleTxt: 'Checkout: Overview',
            finishButton: 'data-test=finish',
            finishTitle: '.complete-header',
            finishSuccessTxt: 'THANK YOU FOR YOUR ORDER'

        }
    }

    async clickContinueCheckoutButton() {
        await page.locator(this.checkout.continueButton).click()
    }

    async fillFirstNameField() {
        await page.locator(this.checkout.firstNameField).fill('Test')
    }

    async fillLastNameField() {
        await page.locator(this.checkout.lastNameField).fill('QA')
    }

    async fillPostalCodeField() {
        await page.locator(this.checkout.postalCodeField).fill('1234567-890')
    }

    async fillCheckoutFields() {
        await this.fillFirstNameField()
        await this.fillLastNameField()
        await this.fillPostalCodeField()
    }

    async getProductDetailFromCheckoutOverview() {
        return await page.locator(this.checkout.overviewInventoryDesc).textContent()
    }

    async getProductValueFromCheckoutOverview() {
        let value = await page.locator(this.checkout.overviewInventoryValue).textContent()
        return parseFloat(value.replace('$', ''))
    }

    async getSubTotalValueFromSummary() {
        let value = await page.locator(this.checkout.summarySubTotalValue).textContent()
        return parseFloat(value.replace(/[^0-9.]+/, ''))
    }

    async sumAllProductsValue() {
        let _sumValue = 0.0
        let _lenght = await page.locator(this.checkout.overviewInventoryValue).count()

        for (let i = 0; i < _lenght; i++) {
            let _value = await page.locator(this.checkout.overviewInventoryValue).nth(i).textContent()
            _sumValue = +parseFloat(_value.replace('$', ''))
        }
        return _sumValue
    }

    async clickFinishButton() {
        await page.locator(this.checkout.finishButton).click()
    }

    // Assertions

    async assertIsCheckoutPage() {
        let _title = await page.locator(this.checkout.title).textContent()
        expect(_title, `Title from Checkout Page should be "${this.checkout.titleTxt}"`).to.equal(this.checkout.titleTxt)
    }

    async assertErrorMessage(errorMessage) {
        let erroPopupText = await page.locator(this.checkout.errorMessage).textContent()
        expect(errorMessage, `Error message should be "${errorMessage}"`).to.equal(erroPopupText)
    }

    async assertIsCheckoutOverviewPage() {
        let titleTxt = await page.locator(this.checkout.title).textContent()
        expect(titleTxt, `Title from Checkout Overview should be "${this.checkout.overviewTitleTxt}"`).to.equal(this.checkout.overviewTitleTxt)
    }

    async assertSubtTotalEqualToSumProductsValue() {
        let totalProductsValue = await this.sumAllProductsValue()
        let subtotal = await this.getSubTotalValueFromSummary()
        expect(totalProductsValue, 'Sum of all products value should be equal to the subtotal').to.equal(subtotal)
    }

    async assertSuccessText() {
        let successText = await page.locator(this.checkout.finishTitle).textContent()
        expect(successText, `Sucess message should be "${this.checkout.finishSuccessTxt}"`).to.equal(this.checkout.finishSuccessTxt)
    }
}
module.exports = { CheckoutPage }