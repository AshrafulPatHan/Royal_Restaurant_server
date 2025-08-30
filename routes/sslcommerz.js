const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require('cors');
const { ObjectId } = require("mongodb");
const app = express();

app.use(cors());
app.use(express.json());
const router = express.Router();

module.exports = (collections) => {


// SSLCommerz Sandbox API URL
const baseURL = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

// তোমার Sandbox Credential
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;

// পেমেন্ট শুরু করার API
router.post("/init", async (req, res) => {
  try {
    const { amount, cus_name, cus_email } = req.body;

    const data = {
      store_id,
      store_passwd,
      total_amount: amount,
      currency: "BDT",
      tran_id: uuidv4(), // unique transaction id
      success_url: "http://localhost:5000/api/sslcommerz/success",
      fail_url: "http://localhost:5000/api/sslcommerz/fail",
      cancel_url: "http://localhost:5000/api/sslcommerz/cancel",
      emi_option: 0,
      cus_name,
      cus_email,
      cus_add1: "Dhaka",
      cus_phone: "01711111111",
      shipping_method: "NO",
      product_name: "Test Product",
      product_category: "General",
      product_profile: "general",
    };

    const response = await axios.post(baseURL, data, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Payment initiation failed" });
  }
});

// Success callback
router.post("/success", (req, res) => {
  console.log("Payment Success:", req.body);
  res.send("Payment Successful!");
});

// Fail callback
router.post("/fail", (req, res) => {
  console.log("Payment Failed:", req.body);
  res.send("Payment Failed!");
});

// Cancel callback
router.post("/cancel", (req, res) => {
  console.log("Payment Cancelled:", req.body);
  res.send("Payment Cancelled!");
});

return router;
}