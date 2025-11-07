const express = require("express");
const Patient = require("../models/Patient");
const { auth, requireRole } = require("../middleware/auth");
const logger = require("../logger");

const router = express.Router();

// Get all patients (admin/doctor)
router.get("/", auth, requireRole(["admin", "doctor"]), async (req, res) => {
  try {
    const patients = await Patient.find().populate(
      "userId",
      "name email username"
    );
    res.json(patients);
  } catch (error) {
    logger.error("Error fetching all patients:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get patient profile
router.get("/profile", auth, requireRole(["patient"]), async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.user.userId });
    if (!patient) {
      return res.status(404).json({ message: "Patient profile not found" });
    }
    res.json(patient);
  } catch (error) {
    logger.error("Error fetching patient profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create/update patient profile
router.post("/profile", auth, requireRole(["patient"]), async (req, res) => {
  try {
    const existingPatient = await Patient.findOne({ userId: req.user.userId });

    if (existingPatient) {
      // Update existing
      const updatedPatient = await Patient.findByIdAndUpdate(
        existingPatient._id,
        req.body,
        { new: true }
      );
      res.json(updatedPatient);
    } else {
      // Create new
      const patient = new Patient({
        ...req.body,
        userId: req.user.userId,
      });
      await patient.save();
      res.status(201).json(patient);
    }
  } catch (error) {
    logger.error("Error creating/updating patient profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get patient by ID (admin/doctor)
router.get("/:id", auth, requireRole(["admin", "doctor"]), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate(
      "userId",
      "name email username"
    );
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.json(patient);
  } catch (error) {
    logger.error("Error fetching patient by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update patient (admin or self)
router.patch("/:id", auth, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Check permissions
    if (
      req.user.role !== "admin" &&
      patient.userId.toString() !== req.user.userId
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPatient);
  } catch (error) {
    logger.error("Error updating patient:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete patient (admin only)
router.delete("/:id", auth, requireRole(["admin"]), async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient deleted" });
  } catch (error) {
    logger.error("Error deleting patient:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
