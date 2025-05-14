Feature: Purchase flow on Demoblaze
 
    Scenario: User logs in and makes a purchase
        Given I am on the Demoblaze homepage
        When I log in with username "internship" and password "test"
        And I add the first product to the cart
        And I add the second product to the cart
        And I go to the cart and place an order with:
            | Name        | luciano    |
            | Country     | argentina  |
            | City        | cordoba    |
            | Credit card | 1234567890 |
            | Month       | 21/12      |
            | Year        | 2040       |
        Then I should see "Thank you for your purchase!"