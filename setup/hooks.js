const playwright = require("playwright")
const { Before, After, BeforeAll, AfterAll, setDefaultTimeout, Status } = require("@cucumber/cucumber")
const { sample } = require("lodash")
const fs = require("fs")
const { version } = require("os")

const DEFAULT_TIMEOUT = 30000
const SLOW_MOTION_BROWSER = 1
var browser_name
setDefaultTimeout(DEFAULT_TIMEOUT)

//TODO: Make navigation files for Before tags hooks
BeforeAll(async () => {
    _arr = ["chromium", "firefox", "webkit"]
    browser_name = sample(_arr)
    console.log(`Browser launched: ${browser_name.toUpperCase()}`)

    global.browser = await playwright[browser_name].launch({
        headless: true,
        slowMo: SLOW_MOTION_BROWSER
    })
})


Before(async (scenario) => {
    global.context = await global.browser.newContext()
    global.page = await global.context.newPage()

    console.log(`A new context and page was created for scenario: ${scenario.pickle.name}`)
})

Before({ tags: '@login' }, async () => {
    const { LoginPage } = require("../page-objects/login-page")
    const lp = new LoginPage()

    await lp.validLogin()
})

Before({ tags: '@shoppingCartFull' }, async () => {
    const { InventoryPage } = require("../page-objects/inventory-page")
    const ip = new InventoryPage()

    await ip.clickAllButtonsByText("Add to Cart")
})

Before({ tags: '@shoppingCart' }, async () => {
    const { InventoryPage } = require("../page-objects/inventory-page")
    const { ShoppingCartPage } = require("../page-objects/shopping-cart-page")
    const ip = new InventoryPage()
    const scp = new ShoppingCartPage()

    await ip.clickFirstProductToAdd("Add to Cart")
    await scp.clickShoppingCartButton()
})


Before({ tags: '@checkout' }, async () => {
    const { InventoryPage } = require("../page-objects/inventory-page")
    const { ShoppingCartPage } = require("../page-objects/shopping-cart-page")
    const ip = new InventoryPage()
    const scp = new ShoppingCartPage()

    await ip.clickFirstProductToAdd("Add to Cart")
    await scp.clickShoppingCartButton()
    await scp.clickCheckoutButton()
})

Before({ tags: '@checkoutOverview' }, async () => {
    const { InventoryPage } = require("../page-objects/inventory-page")
    const { ShoppingCartPage } = require("../page-objects/shopping-cart-page")
    const { CheckoutPage } = require("../page-objects/checkout-page")
    const ip = new InventoryPage()
    const scp = new ShoppingCartPage()
    const cp = new CheckoutPage()

    await ip.clickFirstProductToAdd("Add to Cart")
    await scp.clickShoppingCartButton()
    await scp.clickCheckoutButton()
    await cp.fillCheckoutFields()
    await cp.clickContinueCheckoutButton()
})


After(async function (scenario) {

    let meta_info = {
        "Website Application": "https://www.saucedemo.com/",
        "App Version": "0.0.1",
        "Test Environment": "STAGING",
        "Browser": `${browser_name.toUpperCase()} ${browser.version()}`,
        "Plataform": version()
    }

    // Used to configure metadata from Cucumber Report
    let jsonString = JSON.stringify(meta_info)
    fs.writeFile('metadata_info.json', jsonString, function (err) {
        if (err) throw err
    })

    if (scenario.result.status === Status.FAILED) {
        let world = this

        await page.screenshot({ fullpage: true }).then(function (buffer) {
            return world.attach(buffer, 'image/png')
        })
    }

    await global.page.close()
    await global.context.close()
    console.log("Context and page closed")
})


AfterAll(async () => {
    await global.browser.close()
    console.log("Browser closed. Run command 'npm run report' to see detailed results")
})
