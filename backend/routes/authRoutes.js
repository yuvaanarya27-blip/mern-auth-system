const express = require("express");
const router = express.Router();
const User = require("../models/User");

//
// REGISTER
//
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      mobile,
      gender,
      state,
      pincode
    } = req.body;

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
      message: "User registered successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

//
// LOGIN
//
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    res.status(200).json({
      message: "Login successful",
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