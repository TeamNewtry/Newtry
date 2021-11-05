Feature: Searchbar
  
    As any user I want to be able to search products by clicking on the searchbar.

    Scenario: Open the searchbars keyboard
        Given I am on the homepage
        When I click on the searchbar
        Then a keyboard opens

    Scenario: Search for a product (fail)
        Given that I the searchbars keyboard opened
        When I enter "dasdadsga" or "424859"
        Then a error message will be displayed on the screen

    Scenario: Search for a product (success)
        Given that the searchbars keyboard opened
        When I enter "dmBio Nusskernmischung" or "4058172924859"
        Then a list of all products which match "dmBio Nusskernmischung" or "4058172924859" is shown below the searchbar
    
    Scenario: Show a products ingredients
        Given that I successfully searched for a product
        When I click on "dmBio Nusskernmischung"
        Then a new page will open