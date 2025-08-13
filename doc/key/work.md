## Royal Restaurant

Links
- database model (https://app.eraser.io/workspace/g7uk8COoGWPripJHEcn9?origin=share)
- server host (non)
- next js static (non)

# About server
creating a web server for Royal Restaurant website the server can post food sort leatest food sort by price and have a algoriddim for table reservation 
user can reserve table and see real time which table is available to reservation . There is a admin panel there admin can see the real time data .
The admin can add food update food and delete food. Admin can incrize and decrize the food qulaty . user can review the website after bay a food .

# Key features

server
- server is on nest js
- use MongoDB database
- host on render
- use bakes on payment method

admin 
- admin can add,delete,update food
- there is a sorting system
- there is a authentication system on OAuth


user


# Routes

user routes
- all food
- sort by price (food)
- sort by test food ( sweet, spicy) 
- drink
- sort by price (drink)
- order food (post:method)
- cancel order food (delete:method)
- add review (after order a food user can review the website)

table reservation algoriddim
- show all available table
- table reservation
- mail customer (when the table is available the algoriddim auto mail the customer)

pay online method
- chakout food (pay online with bakes)


admin routes
- login
- add food
- update food
- delete food
- get mail
- add menu
- add blog
- change password
- profile data
- update profile
- all food
- all order food (get:method)
- latest order food (get:method)
- all table reservation
- available table
- mail user

