require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Doctor = require('./models/Doctor');
const Appointment = require('./models/Appointment');

async function fixAppointments() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    // Get all appointments with null or undefined doctorId
    const brokenAppointments = await Appointment.find({
      $or: [
        { doctorId: null },
        { doctorId: { $exists: false } }
      ]
    });

    console.log(`Found ${brokenAppointments.length} appointments with missing doctorId\n`);

    if (brokenAppointments.length === 0) {
      console.log('No broken appointments to fix!');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Get all doctors
    const doctors = await Doctor.find().populate('userId');
    console.log(`Found ${doctors.length} doctors in database\n`);

    let fixed = 0;
    let notFixed = 0;

    for (const appointment of brokenAppointments) {
      console.log(`\nFixing appointment ${appointment._id}`);
      console.log(`  Doctor Name: ${appointment.doctorName}`);
      
      // Find matching doctor by name
      const matchingDoctor = doctors.find(doc => 
        doc.name.toLowerCase() === appointment.doctorName.toLowerCase()
      );

      if (matchingDoctor && matchingDoctor.userId) {
        appointment.doctorId = matchingDoctor.userId._id;
        await appointment.save();
        console.log(`  ✅ Fixed! Set doctorId to: ${matchingDoctor.userId._id}`);
        fixed++;
      } else {
        console.log(`  ❌ Could not find matching doctor for: ${appointment.doctorName}`);
        notFixed++;
      }
    }

    console.log(`\n\n=== SUMMARY ===`);
    console.log(`✅ Fixed: ${fixed} appointments`);
    console.log(`❌ Not Fixed: ${notFixed} appointments`);

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fixAppointments();
