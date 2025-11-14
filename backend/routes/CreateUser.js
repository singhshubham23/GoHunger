const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const jwtToken = "mySecret1234567key"
const bcrypt = require("bcryptjs");


//signup
router.post(
  "/register",
  [
    body("name").isLength({ min: 3 }).withMessage("Name must be at least 3 chars"),
    body("email").isEmail().withMessage("Invalid email"),
    body("location").isLength({ min: 3 }).withMessage("Location must be at least 3 chars"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 chars"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
       const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const { name, email, location } = req.body;
      const newUser = new User({
        name,
        email,
        location,
        password: hashedPassword, // store hash
      });

      await newUser.save();
      res.status(201).json({ message: "User created successfully", user: newUser });
    }

     catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  }
);



//login
router.post("/loginuser", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const payload = { id: user._id };
    const authToken = jwt.sign(payload, jwtToken, { expiresIn: "365d" });


    res.status(200).json({
  message: "Login successful",
  authToken,
  id: user._id,
  name: user.name,
  email: user.email,
});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging user", error });
  }
});


module.exports = router;
