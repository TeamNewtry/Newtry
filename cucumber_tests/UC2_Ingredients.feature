Feature: Ingredients

    As any user I want to be able to see the ingredients of the scanned/searched product

    Background: 
        Given I am on the product page

    When product page was opened
    Given information about ingredients was found
    Then list ingredients
    Given information about ingredients was not found
    Then show info that no ingredients are present

    