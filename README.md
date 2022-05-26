## Playwright Framework with Cucumber
Walkthrough to install, set up and run the tests.\
Scenarios for the Website [SauceLab Demo](https://www.saucedemo.com/)

##
### Requirements - Windows (10 or +)

Install latest [**NodeJS**](https://nodejs.org/en/download/) 
>**_Note_**: Check ``Add to PATH`` option during the installation

Install latest [**GIT**](https://git-scm.com/download/win) to clone the repository

##
### Git Clone and Libs Install

Run this command to clone and install all dependencies: ``git clone https://gitlab.com/Coutinho_W/playwright-with-cucumber.git && cd playwright-with-cucumber && npm i``\

To run all tests use the command: ``npm run test``
To run a specific scenario or feature, use a tag parameter: ``npm run test -- -t @example_tag``
List of tags: 

Feature         | Tag
-------------   | -------------
User Login      | @loginFeature
Inventory       | @inventoryFeature
Shopping Cart   | @shoppingCartFeature 
Checkout        | @checkoutFeature
       
To see the test report run the command ``npm run report && start reports/cucumber_report.html``

Front-End tests reports are available on browser.
##
#### Git Repository

GitLab: [*Playwright with Cucumber*](https://gitlab.com/Coutinho_W/playwright-with-cucumber) 

##
#### Libs

* [Playwright](https://playwright.dev/docs/library) - Webdriver Library
* [Cucumber](https://www.npmjs.com/package/@cucumber/cucumber) - BDD Framework
* [Cucumber HTML Reporter](https://www.npmjs.com/package/cucumber-html-reporter) - Report Library
* [Chai](https://www.npmjs.com/package/chai) - Assertion Library
* [Prettier](https://www.npmjs.com/package/prettier) - Code formatter
