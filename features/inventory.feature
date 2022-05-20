@inventory @login
Feature: Inventory
    In order to choose products available in Inventory
    As a User
    I want to access Inventory page

    Scenario: Add products to shopping cart
        Given I am in the inventory page 
        When I click in "ADD TO CART" button on any product
        Then I should see the quantity increase on shopping cart badge

    @shoppingCartFull
    Scenario: Remove products from shopping cart
        Given I am in the inventory page 
        When I click in "REMOVE" button on any product
        Then I should see the shopping cart badge empty

    Scenario: Sort products by name (Z-A)
        Given I am in the inventory page 
        When I choose sort products by name descending
        Then I should see the last product be the first one

    Scenario: Sort products by value (min to max)
        Given I am in the inventory page 
        When I choose sort products by value (min to max)
        Then I should see the first product be the most cheaper

    Scenario: Sort products by value (max to min)
        Given I am in the inventory page 
        When I choose sort products by value (max to min)
        Then I should see the first product be the most expensive

    Scenario: Access product details
        Given I am in the inventory page 
        When I click on a product name
        Then I should see another page with product details

