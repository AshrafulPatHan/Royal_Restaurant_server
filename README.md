# 👑 Royal Restaurant Server 🍽️



## Short Description of Project

This repository contains the backend server for the **Royal Restaurant** website. Built with **Express.js**, this server is responsible for managing menu data, handling secure administrative access, and integrating a reliable payment gateway via **SSLCommerz**. It provides a robust and scalable foundation for the restaurant's online presence and e-commerce functionalities.

---

## ✨ Key Features

The server implements several critical features to ensure a smooth and secure operation:

* **Public Menu Access:** API endpoints to **fetch the complete restaurant menu** for display on the frontend.
* **Secure Admin Authentication:** Implements **JSON Web Tokens (JWT)** for session management and **Bcrypt** for hashing admin passwords, ensuring only authorized personnel can access administrative functionalities.
* **Payment Integration:** Seamless integration with the **SSLCommerz** payment gateway to handle online transactions for food orders.
* **Comprehensive Menu Management:** The admin interface supports **CRUD (Create, Read, Update, Delete)** operations, allowing administrators to fully manage and update the menu in real-time.
* **User Communication:** Functionality to **receive and process email communications** or inquiries from website users.

---

## 💻 Technology Stack

This project utilizes a modern and efficient set of technologies:

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Backend Framework** | **Node.js** & **Express.js** | Server-side runtime and web framework for building RESTful APIs. |
| **Database** | **MongoDB** | NoSQL database for flexible and scalable storage of menu items, user data, and admin information. |
| **Authentication** | **JSON Web Tokens (JWT)** | Secure, state-less authentication for identifying authorized users (Admins). |
| **Password Hashing** | **Bcrypt** | Industry-standard cryptographic library for securely hashing and storing admin passwords. |
| **Payment Gateway** | **SSLCommerz** | Integration for secure and reliable online payment processing. |

---

## 🗺️ Server Routes

The server is structured around three main route groups:

| Route | Description | Security |
| :--- | :--- | :--- |
| `/` | **Main/Public Routes** | Unsecured. Used for fetching the menu and handling user inquiries. |
| `/admin` | **Admin Routes** | Secured with **JWT**. Used for administrator login and menu CRUD operations. |
| `/api/sslcommerz` | **Payment Routes** | Secured/Server-to-Server. Used for initiating and handling callback/IPN responses from SSLCommerz. |

---

## 🚀 How To Use

Follow these steps to set up and run the Royal Restaurant server locally:

### 1. Prerequisites

Make sure you have the following installed:
* Node.js (LTS recommended)
* MongoDB instance (local or hosted)

### 2. Installation

1.  **Clone the repository:**
    ```bash
    git clone [Your Repository URL]
    cd royal-restaurant-server
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### 3. Configuration

Create a file named `.env` in the root directory and add your configuration variables:

```env
# Server Settings
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/royal-restaurant

# Authentication
JWT_SECRET=YOUR_VERY_SECRET_KEY
BCRYPT_SALT_ROUNDS=10

# SSLCommerz Integration
STORE_ID=your_sslcommerz_store_id
STORE_PASSWORD=your_sslcommerz_store_password
IS_LIVE=false # Set to true for production environment
