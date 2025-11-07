const express = require("express");
const Appointment = require("../models/Appointment");
const { auth, requireRole } = require("../middleware/auth");
const logger = require("../logger");

const router = express.Router();

// Get all appointments (admin)
router.get("/", auth, requireRole(["admin"]), async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    logger.error("Error fetching all appointments:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get appointments for doctor
router.get("/doctor", auth, requireRole(["doctor"]), async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctorId: req.user.userId,
    }).sort({ meetingDate: 1, time: 1 });
    res.json(appointments);
  } catch (error) {
    logger.error("Error fetching appointments for doctor:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get appointments for patient
router.get("/patient", auth, requireRole(["patient"]), async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.user.userId,
    }).sort({ meetingDate: 1, time: 1 });
    res.json(appointments);
  } catch (error) {
    logger.error("Error fetching appointments for patient:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get my appointments (for current user - patient, doctor, or admin)
router.get("/my", auth, async (req, res) => {
  try {
    let appointments;
    
    if (req.user.role === "patient") {
      appointments = await Appointment.find({
        patientId: req.user.userId,
      })
        .populate("doctorId", "name specialization")
        .sort({ appointmentDate: -1 });
    } else if (req.user.role === "doctor") {
      appointments = await Appointment.find({
        doctorId: req.user.userId,
      })
        .populate("patientId", "name")
        .sort({ appointmentDate: -1 });
    } else if (req.user.role === "admin") {
      appointments = await Appointment.find()
        .populate("patientId", "name")
        .populate("doctorId", "name specialization")
        .sort({ appointmentDate: -1 });
    }
    
    res.json(appointments);
  } catch (error) {
    logger.error("Error fetching my appointments:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create appointment
router.post("/", auth, requireRole(["patient"]), async (req, res) => {
  try {
    const appointment = new Appointment({
      ...req.body,
      patientId: req.user.userId,
    });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    logger.error("Error creating appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update appointment status (doctor/admin)
router.patch(
  "/:id/status",
  auth,
  requireRole(["doctor", "admin"]),
  async (req, res) => {
    try {
      const { status } = req.body;
      const appointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      res.json(appointment);
    } catch (error) {
      logger.error("Error updating appointment status:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Delete appointment (admin)
router.delete("/:id", auth, requireRole(["admin"]), async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted" });
  } catch (error) {
    logger.error("Error deleting appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
