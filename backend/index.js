require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();

// ✅ Enable CORS for both local dev and deployed frontend
const allowedOrigins = [
  'http://localhost:3000',             // local dev
  'https://go-hunger-fefx.vercel.app' // your deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // allow cookies if needed
  })
);

// Parse JSON bodies
app.use(express.json());

// Connect to MongoDB
connectDB();

// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// API routes
app.use('/api', require('./routes/CreateUser'));
app.use('/api/food', require('./routes/Food'));
app.use('/api/category', require('./routes/FoodCategoryRoutes'));
app.use('/api/order', require('./routes/OrderRoutes'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
