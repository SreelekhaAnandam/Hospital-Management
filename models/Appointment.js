const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  hospital: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  disease: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  appointmentDate: {
    type: Date,
  },
  appointmentTime: {
    type: String,
  },
  // Legacy fields for backward compatibility
  meetingDate: {
    type: String,
    required: function() {
      return !this.appointmentDate;
    }
  },
  time: {
    type: String,
    required: function() {
      return !this.appointmentTime;
    }
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Approved", "Rejected", "Completed", "Cancelled"],
    default: "Pending",
  },
  symptoms: [String],
  bloodGroup: String,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
