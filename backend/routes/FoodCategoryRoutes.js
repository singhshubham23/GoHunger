const express = require('express');
const router = express.Router();
const FoodCategory = require('../models/FoodCategory');

// Add category
router.post('/', async (req, res) => {
  try {
    const categoriesToInsert = Array.isArray(req.body) ? req.body : [req.body];

    const inserted = [];
    for (let cat of categoriesToInsert) {
      const exists = await FoodCategory.findOne({ name: cat.name });
      if (!exists) {
        const newCat = new FoodCategory(cat);
        await newCat.save();
        inserted.push(newCat);
      }
    }

    res.status(201).json({
      message: 'Categories added successfully (duplicates skipped)',
      categories: inserted
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Get all categories
router.get('/', async (_req, res) => {
  try {
    const categories = await FoodCategory.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
