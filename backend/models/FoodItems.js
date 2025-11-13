const mongoose = require("mongoose");

const FoodItemSchema = new mongoose.Schema({
  CategoryName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  options: [
    {
      Half: { type: Number, required: false },
      Full: { type: Number, required: false }
    }
  ],
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("FoodItem", FoodItemSchema);

