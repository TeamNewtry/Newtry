Feature: Nutrition

    As any user I want to be able to see the nutritional values of the scanned/searched product

    Scenario: Show products nutritional values (success)
        Given that I am on "dmBio Nusskernmischung"  product page
        When "dmBio Nusskernmischung" has a database entry
        Then "Brennwert ..." is shown in the nutrition window

    Scenario: Show products  nutritional values (fail)
        Given that I am on "dmBio Nusskernmischung"  product page
        When "dmBio Nusskernmischung" doesn't have a database entry
        Then a error message will be shown on the screen