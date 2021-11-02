Feature: Searchbar
  
    As any user I want to be able to search products by clicking on the searchbar.

    Background:
        Given I am on the homepage.

    Scenario: Search a product with the searchbar
        Given I am on the homepage and clicked on the searchbar
        Then a keyboard opens.
        When I type in a products name or EAN
        Given that the product doesn't exist
        Then a error message is shown on the screen
        Given that the product exists 
        Then a list of possible products is shown below the searchbar
        When I click on one of the products listed below the searchbar
        Then product page opens