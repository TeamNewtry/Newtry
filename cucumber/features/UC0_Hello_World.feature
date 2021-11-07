Feature: Hello World

    Scenario: Click on button to say "Hello World!"
        Given the test text says "Wrong text"
        When I click on the "Say Hello World" button
        Then the test text says "Hello World!"
