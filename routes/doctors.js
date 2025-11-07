const express = require("express");
const Doctor = require("../models/Doctor");
const { auth, requireRole } = require("../middleware/auth");
const logger = require("../logger");

const router = express.Router();

// Get current doctor's profile
router.get("/profile", auth, requireRole(["doctor"]), async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user.userId }).populate("userId", "name email username");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }
    res.json(doctor);
  } catch (error) {
    logger.error("Error fetching doctor profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("userId", "name email");
    res.json(doctors);
  } catch (error) {
    logger.error("Error fetching all doctors:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get doctors by specialization and hospital
router.get("/search", async (req, res) => {
  try {
    const { specialization, hospital } = req.query;
    const query = {};

    if (specialization) query.specialization = specialization;
    if (hospital) query.hospitals = { $in: [hospital] };

    const doctors = await Doctor.find(query).populate("userId", "name email");
    res.json(doctors);
  } catch (error) {
    logger.error("Error searching doctors:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get doctor by ID
router.get("/:id", async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate(
      "userId",
      "name email"
    );
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    logger.error("Error fetching doctor by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create doctor (admin only)
router.post("/", auth, requireRole(["admin"]), async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    logger.error("Error creating doctor:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update doctor profile (self)
router.patch("/profile", auth, requireRole(["doctor"]), async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.user.userId });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctor._id,
      req.body,
      { new: true }
    ).populate("userId", "name email username");
    
    res.json(updatedDoctor);
  } catch (error) {
    logger.error("Error updating doctor profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update doctor (admin or self)
router.patch("/:id", auth, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Check permissions
    if (
      req.user.role !== "admin" &&
      doctor.userId.toString() !== req.user.userId
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedDoctor);
  } catch (error) {
    logger.error("Error updating doctor:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete doctor (admin only)
router.delete("/:id", auth, requireRole(["admin"]), async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor deleted" });
  } catch (error) {
    logger.error("Error deleting doctor:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
