Feature: Ingredients

    As any user I want to be able to see the ingredients of the scanned/searched product

    Scenario: Show products ingredients (success)
        Given that I am on "dmBio Nusskernmischung"  product page
        When "dmBio Nusskernmischung" has a database entry
        Then "35% Cashewkerne ..." is shown in the nutrition window

    Scenario: Show products  ingredients (fail)
        Given that I am on "dmBio Nusskernmischung"  product page
        When "dmBio Nusskernmischung" doesn't have a database entry
        Then a error message will be shown on the screen
        