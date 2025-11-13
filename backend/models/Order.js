const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    orders: [
      {
        name: String,
        qty: Number,
        price: Number,
        size: String,
      },
    ],
    totalAmount: Number,
    date: { type: Date, default: Date.now },
  },
  { collection: "orders" }
);

module.exports = mongoose.model("Order", OrderSchema);
