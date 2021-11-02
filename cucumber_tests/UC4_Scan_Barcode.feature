Feature: Scan Barcode

    As any user I want to be able to scan products by clicking on the scan button.

    Background:
        Given I am on the homepage.

    Scenario: Scan a product with the scan button
        Given I am on the homepage and click on the scan button
        Then the scanner page opens
        Given I scan a products barcode
        Then the app will try to fetch the corresponding product
        Given the product was not found
        Then a error message will be shown on the screen
        Given the product was found
        Then the product page opens
