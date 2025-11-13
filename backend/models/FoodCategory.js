const mongoose = require("mongoose");

const FoodCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,          
    trim: true
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model("FoodCategory", FoodCategorySchema);
