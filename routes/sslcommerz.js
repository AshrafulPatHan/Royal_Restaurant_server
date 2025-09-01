const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require('cors');
const { ObjectId } = require("mongodb");
const app = express();
const SSLCommerzPayment = require('sslcommerz-lts')

app.use(cors());
app.use(express.json());
const router = express.Router();

module.exports = (collections) => {


  // SSLCommerz Sandbox API URL
  const baseURL = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

  // তোমার Sandbox Credential
  const store_id = process.env.STORE_ID;
  const store_passwd = process.env.STORE_PASSWORD;
  const is_live = false //true for live, false for sandbox

  // পেমেন্ট শুরু করার API
  router.post("/init", async (req, res) => {
    try {
      const { amount, cus_name, cus_email, cus_phone, cus_add1 } = req.body;

      const data = {
        total_amount: amount,
        currency: 'BDT',
        tran_id: 'REF123', // use unique tran_id for each api call
        success_url: 'http://localhost:3000/api/sslcommerz/success',
        fail_url: 'http://localhost:3000/api/sslcommerz/fail',
        cancel_url: 'http://localhost:3000/api/sslcommerz/cancel',
        ipn_url: 'http://localhost:3000/api/sslcommerz/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name,
        cus_email,
        cus_add1,
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone,
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
      };
      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
      sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        // res.redirect(GatewayPageURL)
        res.json({ GatewayPageURL }); // new code; Send JSON instead of redirect
        console.log('Redirecting to: ', GatewayPageURL)
      });
    } catch (error) {
      console.error(error.response?.data || error.message);
      res.status(500).json({ error: "Payment initiation failed" });
    }
  });

  // Success callback
  router.post("/success", (req, res) => {
    console.log("Payment Success:", req.body);
    // res.status(200).send("Payment Successful!");
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Payment Success</title>
        </head>
        <body>
            <h1>Your Payment is successful</h1>
            <a href="http://localhost:5173">Go Home</a>
        </body>
        </html>
    `);
  });

  // Fail callback
  router.post("/fail", (req, res) => {
    console.log("Payment Failed:", req.body);
    // res.send("Payment Failed!");
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Payment Failed</title>
        </head>
        <body>
            <h1>Your Payment is failed</h1>
            <a href="http://localhost:5173">Go Home</a>
        </body>
        </html>
    `);
  });

  // Cancel callback
  router.post("/cancel", (req, res) => {
    console.log("Payment Cancelled:", req.body);
    // res.send("Payment Cancelled!");
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Payment cancel</title>
        </head>
        <body>
            <h1>Your Payment is cancel</h1>
            <a href="http://localhost:5173">Go Home</a>
        </body>
        </html>
    `);
  });

  return router;
}