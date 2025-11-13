require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();

// ✅ Enable CORS for your React dev server
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Parse JSON bodies
app.use(express.json());

// Connect to Mongo
connectDB();

// Simple test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Your user routes
app.use('/api', require('./routes/CreateUser'));
app.use('/api/food', require('./routes/Food'));
app.use('/api/category', require('./routes/FoodCategoryRoutes'));
app.use('/api/order', require('./routes/OrderRoutes'));



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
