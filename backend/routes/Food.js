const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItems');

// POST /api/food  -> add a new food item
router.post('/', async (req, res) => {
  try {
    let result;
    if (Array.isArray(req.body)) {
      result = await FoodItem.insertMany(req.body);
      res.status(201).json({ message: 'Multiple food items added', foods: result });
    } else {
      const food = new FoodItem(req.body);
      result = await food.save();
      res.status(201).json({ message: 'Single food item added', food: result });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// GET /api/food -> fetch all food items
router.get('/', async (req, res) => {
  try {
    const foods = await FoodItem.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
