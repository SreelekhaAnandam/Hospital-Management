const express = require("express");
const Admin = require("../models/Admin");
const User = require("../models/User");
const { auth, requireRole } = require("../middleware/auth");
const logger = require("../logger");

const router = express.Router();

// Get all admins (admin only)
router.get("/", auth, requireRole(["admin"]), async (req, res) => {
  try {
    const admins = await Admin.find().populate("userId", "name email username");
    res.json(admins);
  } catch (error) {
    logger.error("Error fetching all admins:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get admin profile
router.get("/profile", auth, requireRole(["admin"]), async (req, res) => {
  try {
    const admin = await Admin.findOne({ userId: req.user.userId });
    if (!admin) {
      return res.status(404).json({ message: "Admin profile not found" });
    }
    res.json(admin);
  } catch (error) {
    logger.error("Error fetching admin profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create admin profile
router.post("/profile", auth, requireRole(["admin"]), async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne({ userId: req.user.userId });

    if (existingAdmin) {
      return res.status(400).json({ message: "Admin profile already exists" });
    }

    const admin = new Admin({
      ...req.body,
      userId: req.user.userId,
    });
    await admin.save();
    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get system stats (admin only)
router.get("/stats", auth, requireRole(["admin"]), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPatients = await User.countDocuments({ role: "patient" });
    const totalDoctors = await User.countDocuments({ role: "doctor" });
    const totalAdmins = await User.countDocuments({ role: "admin" });

    // You can add more stats as needed
    const stats = {
      totalUsers,
      totalPatients,
      totalDoctors,
      totalAdmins,
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update admin permissions (admin only)
router.patch(
  "/:id/permissions",
  auth,
  requireRole(["admin"]),
  async (req, res) => {
    try {
      const admin = await Admin.findByIdAndUpdate(
        req.params.id,
        { permissions: req.body.permissions },
        { new: true }
      );
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      res.json(admin);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
