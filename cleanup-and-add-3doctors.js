const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hospital-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import models
const User = require('./models/User');
const Doctor = require('./models/Doctor');

// Sample doctors data - only 3 doctors with 3 hospitals
const sampleDoctors = [
  {
    name: 'Dr. Rajesh Kumar',
    username: 'dr.rajesh',
    email: 'rajesh.kumar@hospital.com',
    password: 'doctor123',
    specialization: 'Cardiology',
    hospitals: ['Apollo Hospitals'],
    experience: 15
  },
  {
    name: 'Dr. Priya Sharma',
    username: 'dr.priya',
    email: 'priya.sharma@hospital.com',
    password: 'doctor123',
    specialization: 'Dermatology',
    hospitals: ['Fortis Healthcare'],
    experience: 10
  },
  {
    name: 'Dr. Amit Patel',
    username: 'dr.amit',
    email: 'amit.patel@hospital.com',
    password: 'doctor123',
    specialization: 'Neurology',
    hospitals: ['AIIMS'],
    experience: 12
  }
];

async function cleanupAndAddDoctors() {
  try {
    console.log('Starting cleanup and adding 3 doctors...\n');

    // Delete all existing doctors and their user accounts
    console.log('🗑️  Deleting all existing doctors...');
    const existingDoctors = await Doctor.find();
    for (const doc of existingDoctors) {
      await User.findByIdAndDelete(doc.userId);
    }
    await Doctor.deleteMany({});
    console.log('✅ All existing doctors deleted\n');

    // Add new 3 doctors
    for (const doctorData of sampleDoctors) {
      // Create user account
      const user = new User({
        username: doctorData.username,
        password: doctorData.password,
        role: 'doctor',
        name: doctorData.name,
        email: doctorData.email,
      });

      await user.save();
      console.log(`✅ Created user account for ${doctorData.name}`);

      // Create doctor profile
      const doctor = new Doctor({
        userId: user._id,
        name: doctorData.name,
        email: doctorData.email,
        specialization: doctorData.specialization,
        hospitals: doctorData.hospitals,
        experience: doctorData.experience,
        licenseNumber: `LIC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        rating: Math.floor(Math.random() * 2) + 3.5, // Random rating between 3.5 and 5
        availability: {
          monday: { start: '09:00', end: '17:00' },
          tuesday: { start: '09:00', end: '17:00' },
          wednesday: { start: '09:00', end: '17:00' },
          thursday: { start: '09:00', end: '17:00' },
          friday: { start: '09:00', end: '17:00' },
          saturday: { start: '09:00', end: '13:00' },
          sunday: { start: '', end: '' }
        }
      });

      await doctor.save();
      console.log(`✅ Created doctor profile for ${doctorData.name}`);
      console.log(`   - Specialization: ${doctorData.specialization}`);
      console.log(`   - Hospital: ${doctorData.hospitals.join(', ')}`);
      console.log(`   - Experience: ${doctorData.experience} years`);
      console.log(`   - Username: ${doctorData.username}`);
      console.log(`   - Password: ${doctorData.password}\n`);
    }

    console.log('\n✅ Cleanup complete! Now you have only 3 doctors with 3 hospitals.');
    console.log('\nLogin credentials for all doctors:');
    console.log('Password: doctor123');
    console.log('\nDoctors:');
    sampleDoctors.forEach(doc => {
      console.log(`  - ${doc.username} (${doc.name} - ${doc.specialization} at ${doc.hospitals[0]})`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed.');
  }
}

// Run the script
cleanupAndAddDoctors();
