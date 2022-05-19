class InventoryPage {

    async assertUserIsInInventoryPage() {
        await page.waitForSelector('.inventory_list')
    }
}

module.exports = { InventoryPage }