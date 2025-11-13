const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// ✅ Create order route
router.post("/createOrder", async (req, res) => {
  try {
    const { email, orderData, totalAmount } = req.body;

    if (!email || !orderData) {
      return res.status(400).json({ message: "Email and order data are required" });
    }

    const newOrder = new Order({
      email,
      orders: orderData,
      totalAmount,
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully!" });
  } catch (err) {
    console.error("Order save error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
