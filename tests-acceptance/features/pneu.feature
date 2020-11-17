Feature: As an employer
         I want to see the tire data 
         So that I can modify data, assign it to a vehicle, delete a tire and calculate cost-benefit

Scenario: Assign to a vehicle
Given I'm in page of tire "0001" 
And I see that the tire is not assigned to a vehicle
When I try to assign the tire to the vehicle with plate "ROB2121" in position "Traseira" and side "Esquerda"
Then I'm  still on the tire page of tire "0001"
And I can see that the tire has been assigned to a vehicle with plate "ROB2121" in position "Traseira" and side "Esquerda"

Scenario: Calculate cost-benefit (B case)
Given I'm in page of tire "0001"
And I see that the tire "0001" have "50" in Kms field and "200" in Custo field and a empty list of events
And I see the option "C/B"
When I try to calculate the cost-benefit
Then I see a pop-up with four fields: "Kms(mil): 50", "Custo: R$ 200", "Km/C: 250.00" and "Coef: 0.83"
And I see a capital letter with value "B" in top

Scenario: Calculate cost-benefit (C case)
Given I'm in page of tire "0002"
And I see that the tire "0002" have "55" in Kms field and "320" in Custo field and a empty list of events
And I see the option "C/B"
When I try to calculate the cost-benefit
Then I see a pop-up with four fields: "Kms(mil): 55", "Custo: R$ 320", "Km/C: 171.88" and "Coef: 0.61"
And I see a capital letter with value "C" in top

Scenario: Delete a tire
Given I'm in page of tire "0001"
And I see the option "Excluir"
When I try to delete the tire "0001"
Then I see an alert "O pneu 0001 foi removido"
And I'm redirected to page of tires list