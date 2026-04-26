const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, mobile, gender, state, pincode } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      mobile,
      gender,
      state,
      pincode
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

module.exports = router;