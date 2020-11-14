Feature: 
As a user of the system
I want to register tyres
So that I can manage their informations

Scenario: Registering tyre with success
Given I am at the "tyrelist" page
Given I cannot see a tyre with "id" "0001" in the tyres list
When I try to register tyre "0001" with "brand" "Goodyear", "rim" "16", "width" "215", "cost" "0", "capacity" "94", "mileage" "0", "treadwear" "200" and "date" "20/02/2019"
Then I can see tyre "0001" with "brand" "Goodyear", "rim" "16" and "date" "20/02/2019" in the tyres list

Scenario: Deleting tyre with registered id
Given I am at the "tyrelist" page
Given I can see a tyre with "id" "0002" in the tyres list
When I try to delete tyre with "id" "0002"
Then I can no longer see tyre with "id" "0002" in the tyres list