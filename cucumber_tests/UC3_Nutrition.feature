Feature: Nutrition

    As any user I want to be able to see the Nutrition of the scanned/searched product

    Background: 
        Given I am on the product page

    When product page was opened
    Given information about nutritional values were found
    Then list nutritional values
    Given information about nutritional values was not found
    Then show info that no nutritional values are present
