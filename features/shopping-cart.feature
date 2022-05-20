@shoppingCartFeature @login
Feature: Shopping Cart
    In order to select products to buy
    As a User
    I want to access Shopping Cart

    Scenario: Check shopping cart items
        Given I am in the inventory page
        And I click in "ADD TO CART" button of a product
        When I click on shopping cart button
        Then I should see the same product in shopping cart page

    @shoppingCart
    Scenario: Continue Shopping button
        Given I am in the shopping cart page
        When I click on Continue Shoppging button
        Then I should see the inventory page


    @shoppingCart
    Scenario: Remove products from shopping cart
        Given I am in the shopping cart page
        When I click on Remove button
        Then I should see the shopping cart page empty