@loginFeature
Feature: User Login 
    In order to access Home Page
    As a User
    I want to login into application

    Scenario: Login with valid credential
        Given I visit the login page
        When I fill the form with valid credentials
        Then I should see the inventory page

    @login
    Scenario: User Logout
        Given I am in the inventory page
        When I click the logout button
        Then I should see the login page

    
    Scenario Outline: Attempt to login with invalid credentials
        Given I visit the login page
        When I fill the form with "<username>" and "<password>"
        Then a credential error message should be displayed

        Examples:
        | username              | password          |
        | standard_user         | fail-1            | 
        | fail-2                | secret_sauce      | 
        | fail-3                | fail-3            | 

    Scenario: User locked credentials
        Given I visit the login page
        When I fill the form with a locked credentials
        Then an error message should be displayed