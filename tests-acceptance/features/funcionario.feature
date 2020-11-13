Feature: As a user of the system
         I want to register employees
         So that I can manage the employees

Scenario: Registering employees with non registered CPF
Given I am at the employees page
Given I cannot see an employee with CPF "12345678911" in the employees list
When I try to register the employee "Andre" with CPF "12345678911", function "Recepcionista" and phone number "81975853545"
Then I can see "Andre" with CPF "12345678911", function "Recepcionista" and phone number "81975853545" in the employees list

Scenario: Removing an existing employee
Given I am at the employees page
Given I can see an employee with CPF "12345678999" in the employees list
When I try to remove the employee with CPF "12345678999"
Then I cannot see the employee with CPF "12345678999" in the employees list