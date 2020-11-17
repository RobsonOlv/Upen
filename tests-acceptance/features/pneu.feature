Feature: As an employer
         I want to see the tire data 
         So that I can modify data, assign it to a vehicle, delete a tire and calculate cost-benefit

Scenario: Assign to a vehicle
Given I'm in page of tire "0001" 
And I see that the tire is not assigned to a vehicle
When I try to assign the tire to the vehicle with plate "ROB2121" in position "Traseira" and side "Esquerda"
Then I'm  still on the tire page of tire "0001"
And I can see that the tire has been assigned to a vehicle with plate "ROB2121" in position "Traseira" and side "Esquerda"

Scenario: Delete a tire
Given I'm in page of tire "0001"
And I see the option "Excluir"
When I try to delete the tire "0001"
Then I see an alert "O pneu 0001 foi removido"
And I'm redirected to page of tires list