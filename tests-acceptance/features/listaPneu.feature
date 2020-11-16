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
Given I can see a tyre with "id" "0002" with "brand" "Pirelli", "rim" "18", "width" "200", "cost" "0", "capacity" "100", "mileage" "0", "treadwear" "220" and "date" "15/10/2019" in the tyres list
When I try to delete tyre with "id" "0002"
Then I can no longer see tyre with "id" "0002" in the tyres list

Scenario: Restoring tyre from trash bin
Given I am at the "tyrelist" page
Given I can see tyre with "id" "0003" with "brand" "MICHELIN", "rim" "15", "width" "220", "cost" "0", "capacity" "110", "mileage" "0", "treadwear" "250" and "date" "15/10/2020" in the tyres list
When I delete tyre with "id" "0003"
And I click on the "trashbin" to go to the list of deleted tyres
And I try to restore tyre with "id" "0003" back to the tyres list
Then I can see tyre with "id" "0003" in the tyres list

Scenario: Visualizing tyre
Given I am at the "tyrelist" page
Given I see tyre with "id" "0004" with "brand" "Continental", "rim" "17", "width" "210", "cost" "0", "capacity" "105", "mileage" "0", "treadwear" "240" and "date" "01/09/2020" in the tyres list
When I type "0004" on the "search bar" and press the search button
Then I am at the page of the tyre with "id" "0004" 