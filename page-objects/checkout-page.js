const { expect } = require("chai")

const
    checkoutTitleClass = '.title',
    checkoutTitleText = 'Checkout: Your Information',
    continueButtonId = 'data-test=continue',
    cancelButtonId = 'data-test=cancel',
    errorMessageId = 'data-test=error'
    firstNameFieldId = 'data-test=firstName',
    lastNameFieldId = 'data-test=lastName',
    postalCodeFieldId = 'data-test=postalCode',
    textFirstNameField = 'Test',
    textLastNameField = 'QA',
    textPostalCodeField = '1234567-890',
    checkoutOverviewTitleClass = '.title',
    checkoutOverviewTitleText = 'Checkout: Overview',
    checkoutOverviewInventoryDesc = '.inventory_item_desc',
    checkoutOverviewInventoryValue = '.inventory_item_price',
    summarySubTotalValueClass = '.summary_subtotal_label',
    finishButtonTextId = 'data-test=finish',
    finishTitleClass = '.complete-header',
    finishSuccessText = 'THANK YOU FOR YOUR ORDER'




class CheckoutPage {

    async clickContinueCheckoutButton() {
        await page.locator(continueButtonId).click()
    }

    async fillFirstNameField(){
        await page.fill(firstNameFieldId, textFirstNameField)
    }

    async fillLastNameField(){
        await page.fill(lastNameFieldId, textLastNameField)
    }

    async fillPostalCodeField(){
        await page.fill(postalCodeFieldId, textPostalCodeField)
    }

    async fillCheckoutFields(){
        await this.fillFirstNameField()
        await this.fillLastNameField()
        await this.fillPostalCodeField()
    }

    async getProductDetailFromCheckoutOverview(){
        return await page.locator(checkoutOverviewInventoryDesc).textContent()
    }

    async getProductValueFromCheckoutOverview(){
        let value = await page.locator(checkoutOverviewInventoryValue).textContent()
        return await parseFloat(value.replace('$', ''))
    }

    async getSubTotalValueFromSummary(){
        let value = await page.locator(summarySubTotalValueClass).textContent()
        let newValue = value.replace(/[^0-9.]+/, '')
        return await parseFloat(newValue)
    }

    async sumAllProductsValue(){
        let _sumValue = 0.00
        let _lenght = await page.locator('.inventory_item_price').count()

        for (let i = 0; i < _lenght; i++) {
            let _value = await page.locator('.inventory_item_price').nth(i).textContent()
            _sumValue =+ parseFloat(_value.replace('$', ''))
        }
        return _sumValue
    }

    async clickFinishButton(){
        await page.locator(finishButtonTextId).click()
    }

    // Assertions

    async assertIsCheckoutPage() {
        let title = await page.locator(checkoutTitleClass).textContent()
        expect(title).to.equal(checkoutTitleText)
    }

    async assertErrorMessage(errorMessage) {
        let erroPopupText = await page.locator(errorMessageId).textContent()
        expect(errorMessage).to.equal(erroPopupText)
    }

    async assertIsCheckoutOverviewPage(){
        let checkoutOverviewText = await page.locator(checkoutOverviewTitleClass).textContent()
        expect(checkoutOverviewText).to.equal(checkoutOverviewTitleText)
    }

    async assertSubtTotalEqualToSumProductsValue(){
        let totalProductsValue = await this.sumAllProductsValue()
        let subtotal = await this.getSubTotalValueFromSummary()
        expect(totalProductsValue).to.equal(subtotal)
    }

    async assertSuccessText(){
        let successText = await page.locator(finishTitleClass).textContent()
        expect(successText).to.equal(finishSuccessText)
    }

}

module.exports = { CheckoutPage }