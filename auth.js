const express = require("express");
const router = express.Router();
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    // ✅ Anyone can register (no extra restrictions)
    const newUser = new User({ email, password, userType });
    await newUser.save();

    // after register, redirect to login
    res.status(201).json({ message: "Registration successful! Please login." });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Error registering user!" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid credentials!" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });

    // save session
    req.session.userId = user._id;

    res.json({ message: "Login successful!", user: { email: user.email, userType: user.userType } });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Error logging in!" });
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out successfully!" });
  });
});

module.exports = router;
