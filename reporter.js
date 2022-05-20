const reporter = require("cucumber-html-reporter")
const metadata_info = require("./metadata_info.json")

const options = {
    theme: "bootstrap",
    jsonFile: "cucumber_report.json",
    output: "reports/cucumber_report.html",
    brandTitle: "Regression Test",
    screenshotsDirectory: 'reports/screenshot',
    storeScreenshots: false,
    reportSuiteAsScenario: true,
    scenarioTimestamp: true,
    launchReport: false,
    metadata: metadata_info,
}

reporter.generate(options)