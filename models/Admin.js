const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  permissions: {
    manageUsers: { type: Boolean, default: true },
    manageAppointments: { type: Boolean, default: true },
    manageDoctors: { type: Boolean, default: true },
    viewReports: { type: Boolean, default: true },
    systemSettings: { type: Boolean, default: false },
  },
  lastLogin: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Admin", adminSchema);
