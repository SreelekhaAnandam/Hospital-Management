require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Appointment = require('./models/Appointment');

async function checkAppointments() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const appointments = await Appointment.find()
      .populate('patientId', 'name email contactNumber')
      .populate('doctorId', 'name specialization email contactNumber');
    
    console.log('\n=== APPOINTMENTS IN DATABASE ===');
    console.log('Total appointments:', appointments.length);
    console.log('\n');
    
    if (appointments.length === 0) {
      console.log('❌ No appointments found in database!');
      console.log('This means patients have not booked any appointments yet.');
    } else {
      console.log('✅ Found appointments in database!\n');
      appointments.forEach((apt, index) => {
        console.log(`\n--- Appointment ${index + 1} ---`);
        console.log('ID:', apt._id);
        console.log('Patient Name:', apt.patientName);
        console.log('Patient ID Object:', apt.patientId);
        console.log('Doctor Name:', apt.doctorName);
        console.log('Doctor ID Object:', apt.doctorId);
        console.log('Hospital:', apt.hospital);
        console.log('Disease:', apt.disease);
        console.log('Date:', apt.appointmentDate || apt.meetingDate);
        console.log('Time:', apt.appointmentTime || apt.time);
        console.log('Status:', apt.status);
        console.log('Age:', apt.age);
        console.log('Gender:', apt.gender);
        console.log('Blood Group:', apt.bloodGroup);
        console.log('Created At:', apt.createdAt);
      });
    }

    await mongoose.connection.close();
    console.log('\n\nDatabase connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkAppointments();
