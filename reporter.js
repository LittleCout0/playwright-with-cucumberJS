const reporter = require("cucumber-html-reporter")

const options = {
    theme: "bootstrap",
    jsonFile: "cucumber_report.json",
    output: "reports/cucumber_report.html",
    reportSuiteAsScenario: true,
    scenarioTimestamp: true,
    launchReport: false,
    metadata: {
        "App Version": "2.1.1",
        "Test Environment": "Staging"
    },
    Browser: "Chrome 54.0",
    Platform: "Windows 10"
}

reporter.generate(options)