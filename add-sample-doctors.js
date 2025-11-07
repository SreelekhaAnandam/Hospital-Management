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

// Sample doctors data
const sampleDoctors = [
  {
    name: 'Dr. Rajesh Kumar',
    username: 'dr.rajesh',
    email: 'rajesh.kumar@hospital.com',
    password: 'doctor123',
    specialization: 'Cardiology',
    hospitals: ['Apollo Hospitals', 'Fortis Healthcare'],
    experience: 15
  },
  {
    name: 'Dr. Priya Sharma',
    username: 'dr.priya',
    email: 'priya.sharma@hospital.com',
    password: 'doctor123',
    specialization: 'Dermatology',
    hospitals: ['AIIMS', 'Max Healthcare'],
    experience: 10
  },
  {
    name: 'Dr. Amit Patel',
    username: 'dr.amit',
    email: 'amit.patel@hospital.com',
    password: 'doctor123',
    specialization: 'Neurology',
    hospitals: ['Manipal Hospitals', 'Medanta'],
    experience: 12
  },
  {
    name: 'Dr. Sneha Reddy',
    username: 'dr.sneha',
    email: 'sneha.reddy@hospital.com',
    password: 'doctor123',
    specialization: 'Orthopedics',
    hospitals: ['Kokilaben Dhirubhai Ambani Hospital', 'BLK-Max Super Speciality Hospital'],
    experience: 8
  },
  {
    name: 'Dr. Vikram Singh',
    username: 'dr.vikram',
    email: 'vikram.singh@hospital.com',
    password: 'doctor123',
    specialization: 'Pediatrics',
    hospitals: ['Artemis Hospital', 'Indraprastha Apollo Hospital'],
    experience: 14
  },
  {
    name: 'Dr. Anjali Mehta',
    username: 'dr.anjali',
    email: 'anjali.mehta@hospital.com',
    password: 'doctor123',
    specialization: 'Psychiatry',
    hospitals: ['Lilavati Hospital', 'Apollo Hospitals'],
    experience: 11
  },
  {
    name: 'Dr. Arjun Desai',
    username: 'dr.arjun',
    email: 'arjun.desai@hospital.com',
    password: 'doctor123',
    specialization: 'General Surgery',
    hospitals: ['Fortis Healthcare', 'AIIMS'],
    experience: 16
  },
  {
    name: 'Dr. Kavita Nair',
    username: 'dr.kavita',
    email: 'kavita.nair@hospital.com',
    password: 'doctor123',
    specialization: 'Obstetrics & Gynecology',
    hospitals: ['Manipal Hospitals', 'Max Healthcare'],
    experience: 13
  },
  {
    name: 'Dr. Rahul Verma',
    username: 'dr.rahul',
    email: 'rahul.verma@hospital.com',
    password: 'doctor123',
    specialization: 'Ophthalmology',
    hospitals: ['Medanta', 'Kokilaben Dhirubhai Ambani Hospital'],
    experience: 9
  },
  {
    name: 'Dr. Meera Iyer',
    username: 'dr.meera',
    email: 'meera.iyer@hospital.com',
    password: 'doctor123',
    specialization: 'ENT',
    hospitals: ['BLK-Max Super Speciality Hospital', 'Artemis Hospital'],
    experience: 7
  }
];

async function addSampleDoctors() {
  try {
    console.log('Starting to add sample doctors...\n');

    for (const doctorData of sampleDoctors) {
      // Check if user already exists
      const existingUser = await User.findOne({ username: doctorData.username });
      if (existingUser) {
        console.log(`❌ User ${doctorData.username} already exists. Skipping...`);
        continue;
      }

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
      console.log(`   - Hospitals: ${doctorData.hospitals.join(', ')}`);
      console.log(`   - Experience: ${doctorData.experience} years`);
      console.log(`   - Username: ${doctorData.username}`);
      console.log(`   - Password: ${doctorData.password}\n`);
    }

    console.log('\n✅ All sample doctors added successfully!');
    console.log('\nLogin credentials for all doctors:');
    console.log('Password: doctor123');
    console.log('\nUsernames:');
    sampleDoctors.forEach(doc => {
      console.log(`  - ${doc.username} (${doc.name} - ${doc.specialization})`);
    });

  } catch (error) {
    console.error('❌ Error adding sample doctors:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed.');
  }
}

// Run the script
addSampleDoctors();
