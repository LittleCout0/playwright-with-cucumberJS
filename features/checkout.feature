@checkoutFeature @login
Feature: Checkout
    In order to buy products from shopping cart
    As a User
    I want to access Checkout page

    @checkout
    Scenario: First name field unfilled
        Given I am in the checkout page
        When I click in Continue button
        Then I should see an error message "Error: First Name is required"

    @checkout
    Scenario: Last name field unfilled
        Given I am in the checkout page
        And I fill First Name field only
        When I click in Continue button
        Then I should see an error message "Error: Last Name is required"

    @checkout 
    Scenario: Postal Code field unfilled
        Given I am in the checkout page
        And I only unfilled Postal Code field
        When I click in Continue button
        Then I should see an error message "Error: Postal Code is required"

    @shoppingCart
    Scenario: Checkout overview
        Given I have a product to buy
        And I go to checkout page
        And I fill all the fields corretly
        When I click on Checkout button
        Then I should see the Checkout Overview page
        And the product I choose has same data from shopping cart
        And subtotal is equal to sum of all products value

    @checkoutOverview
    Scenario: Transaction Success
        Given I am in the checkout overview page
        When I click on Finish button
        Then I should see a title message 
        