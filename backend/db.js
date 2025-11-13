const mongoose = require("mongoose");
const FoodItem = require("./models/FoodItems"); // points to your model

const connectDB = async () => {
  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Optional: fetch all food items at startup from 'fooditems' collection
    const allFoodItems = await FoodItem.find(); // will query the 'fooditems' collection
    global.food_items = allFoodItems;
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
