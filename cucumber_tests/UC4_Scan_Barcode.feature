Feature: Scan Barcode

    As any user I want to be able to scan products by clicking on the scan button.

    Scenario: Open the scanner 
        Given I am on the homepage
        When I click on the scan button
        Then the scanner page opens

    Scenario: Scan a product
        Given that I am on the scanner page
        When I scan a products barcode
        Then the app will try to fetch "dmBio Nusskernmischung"

    Scenario: No product found
        Given that I scanned a products barcode
        When "dmBio Nusskernmischung" has no database entry
        Then a error message will be displayed on the screen
    
    Scenario: Product found
        Given that i scanned a products barcode
        When "dmBio Nusskernmischung" has a database entry
        Then the product page opens