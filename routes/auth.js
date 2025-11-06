const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const logger = require("../logger");

const router = express.Router();

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // If role is provided, check if it matches the user's role or set it if not set
    if (role) {
      if (user.role && user.role !== role) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      if (!user.role) {
        user.role = role;
        await user.save();
      }
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        name: user.name,
      },
    });
  } catch (error) {
    logger.error('Error in login:', error);
    res.status(500).json({ message: "Server error" });
  }
});

// Register (for admin use)
router.post("/register", async (req, res) => {
  try {
    const { username, password, role, name, email } = req.body;

    // Provide a clearer message for conflicts so users know whether the
    // username or email is already taken.
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = new User({
      username,
      password,
      role,
      name,
      email,
    });

    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    logger.error('Error in register:', error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get current user
router.get("/me", require("../middleware/auth").auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (error) {
    logger.error('Error in get current user:', error);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;
