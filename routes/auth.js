const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Doctor = require("../models/Doctor");
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
    const { username, password, role, name, email, specialization, hospitals } = req.body;

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

    // If role is doctor, create doctor profile
    if (role === "doctor") {
      if (!specialization || !hospitals || hospitals.length === 0) {
        // Delete the user if doctor profile creation fails
        await User.findByIdAndDelete(user._id);
        return res.status(400).json({ 
          message: "Specialization and at least one hospital are required for doctors" 
        });
      }

      const doctor = new Doctor({
        userId: user._id,
        name: name,
        email: email,
        specialization: specialization,
        hospitals: hospitals,
        experience: 0, // Default experience
        licenseNumber: `LIC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`, // Auto-generate license number
        rating: 0,
      });

      try {
        await doctor.save();
        logger.info(`Doctor profile created for user: ${username}`);
      } catch (doctorError) {
        // If doctor creation fails, delete the user
        await User.findByIdAndDelete(user._id);
        logger.error('Error creating doctor profile:', doctorError);
        return res.status(500).json({ message: "Error creating doctor profile" });
      }
    }

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
