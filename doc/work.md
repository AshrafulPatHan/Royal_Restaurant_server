# Royal Restaurant

Links
- database model (https://app.eraser.io/workspace/g7uk8COoGWPripJHEcn9?origin=share)
- server host (non)
- next js static (non)

## About server
creating a web server for Royal Restaurant website the server can post food sort latest food sort by price and have a algoriddim for table reservation 
user can reserve table and see real time which table is available to reservation . There is a admin panel there admin can see the real time data .
The admin can add food update food and delete food. Admin can increase and decrease the food quality . user can review the website after bay a food .

## Key features

server
- server is on express js
- use MongoDB database
- host on render
- use bakes on payment method

admin 
- admin can add,delete,update food
- there is a sorting system
- there is a authentication system on OAuth
- admin can see all review and shoes which one publish on home page


user
- user can see all food and menu (food is on home page limited food , menu is all food)
- user can sort food
- order a food
- cancel a order
- reserve a table and see which table is available to reserve
- add review on website after order a food and if the customer cancel the order the review is deleted
- user can see bast review 


## Routes

user routes
- all food
- sort by price         (food)
- sort by test food     ( sweet, spicy) 
- drink
- sort by price         (drink)
- order food            (post:method)
- cancel order food     (delete:method)
- add review            (after order a food user can review the website)

table reservation algoriddim
- show all available table {data:json}
- table reservation
- mail customer (when the table is available the algoriddim auto mail the customer)

pay online method
- checkout food (pay online with bakes)


admin routes
- login                     {data:name,password}
- add food                  {data:json}(select the menu on admin panel)
- update food               {data:FoodName,price,details,rating(1to5)}
- delete food               {data:FoodName,price,details,rating(1to5)}
- get mail                  {data:name,email,mail}
- add menu                  {data:FoodName,price,details,rating(1to5),type}
- add blog                  {data : title,date,description}
- change password           {data:name,password}
- profile data              {data:name,photoUrl,about,email}
- update profile            {data:name,photoUrl,about,email}
- all food                  {data:FoodName,price,details,rating(1to5)}
- all menu                  {data:FoodName,price,details,rating(1to5)}
- all order food            (get:method)
- latest order food         (get:method)
- all table reservation     {data:json}
- available table           {data:json}
- mail user                 (mail server)
- all review                {data:name,photoUrl,review:text}

