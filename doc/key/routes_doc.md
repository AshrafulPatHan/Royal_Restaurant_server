# Royal Restaurant Web Application

**Links:**

* [Database Model](https://app.eraser.io/workspace/g7uk8COoGWPripJHEcn9?origin=share)
* Server Host: Not deployed yet
* Next.js Static Site: Not deployed yet

---

## Overview

The Royal Restaurant project is a full-stack web application that allows users to browse the menu, order food, and reserve tables online. The system also includes an admin panel where administrators can manage food items, monitor reservations, and moderate reviews.

Key functionalities include:

* Food management (CRUD operations)
* Table reservation system with real-time availability
* Online ordering and payment
* Review system for users

The server is built with **NestJS** and uses **MongoDB** for data storage. It is intended to be hosted on **Render**.

---

## Key Features

### Server

* Built with **NestJS**
* Database: **MongoDB**
* Hosted on **Render** (deployment pending)
* Supports online payments

### Admin Panel

* Add, update, and delete food items
* Food sorting system by price, type, and rating
* OAuth-based authentication
* View, approve, or reject user reviews
* Manage table reservations and orders

### User

* Browse featured foods on the homepage
* View full menu with all food items
* Sort foods by price or taste (sweet, spicy, etc.)
* Order and cancel food
* Reserve tables and see real-time availability
* Add reviews after ordering food
* Only see reviews for completed orders

---

## API Routes

### User Routes

* `GET /foods` – Get all food items
* `GET /foods/sort/price` – Sort foods by price
* `GET /foods/sort/taste` – Sort foods by taste (sweet, spicy, etc.)
* `GET /drinks` – Get all drinks
* `GET /drinks/sort/price` – Sort drinks by price
* `POST /order` – Place a food order
* `DELETE /order/:id` – Cancel an order
* `POST /review` – Add a review after ordering food

### Table Reservation

* `GET /tables/available` – Show all available tables (JSON)
* `POST /tables/reserve` – Reserve a table
* Automatic email notification when a table is available

### Payment

* `POST /checkout` – Pay for food online using integrated payment methods

### Admin Routes

* `POST /admin/login` – Login with username and password
* `POST /admin/food/add` – Add a new food item
* `PUT /admin/food/update` – Update existing food (name, price, details, rating)
* `DELETE /admin/food/delete` – Delete food item
* `GET /admin/orders` – Get all food orders
* `GET /admin/orders/latest` – Get latest food orders
* `GET /admin/tables` – Get all table reservations
* `GET /admin/tables/available` – Get available tables
* `POST /admin/mail` – Send emails to users
* `GET /admin/reviews` – View all reviews
* `POST /admin/menu/add` – Add new menu items
* `POST /admin/blog/add` – Add blog posts (title, date, description)
* `POST /admin/profile/update` – Update profile data (name, photo, about, email)
* `POST /admin/password/change` – Change admin password

