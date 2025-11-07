# Hospital Management System

A comprehensive web-based Hospital Management System built with Node.js, Express, and MongoDB Atlas. This system provides role-based access for administrators, doctors, and patients to manage hospital operations efficiently.

## Features

### 👨‍⚕️ For Doctors

- View and manage appointments
- Access patient information
- Update appointment status
- View personal schedule

### 👤 For Patients

- Book appointments with doctors
- View appointment history
- Manage personal profile
- View health summary

### 🔐 For Administrators

- Manage doctors and patients
- View system-wide statistics
- Monitor appointments
- User management

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Logging**: Winston
- **Frontend**: HTML, CSS, JavaScript

## Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- Git

## Installation

1. Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/hospital-management.git
cd hospital-management
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

4. Start the server:

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

5. Open your browser and navigate to:

```
http://localhost:3000
```

## Project Structure

```
hospital-management/
├── config/
│   └── database.js          # Database configuration
├── middleware/
│   └── auth.js              # Authentication middleware
├── models/
│   ├── Admin.js             # Admin model
│   ├── Doctor.js            # Doctor model
│   ├── Patient.js           # Patient model
│   ├── User.js              # User model
│   └── Appointment.js       # Appointment model
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── admins.js            # Admin routes
│   ├── doctors.js           # Doctor routes
│   ├── patients.js          # Patient routes
│   ├── appointments.js      # Appointment routes
│   └── debug.js             # Debug routes
├── public/
│   ├── css/
│   ├── js/
│   ├── index.html           # Landing page
│   ├── login.html           # Login page
│   ├── signup.html          # Signup page
│   ├── admin.html           # Admin dashboard
│   ├── doctor.html          # Doctor dashboard
│   ├── patient.html         # Patient dashboard
│   └── ...                  # Other HTML pages
├── logs/                    # Application logs
├── server.js                # Main application file
├── logger.js                # Logger configuration
├── package.json             # Dependencies
└── README.md                # This file
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Doctors

- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `PUT /api/doctors/:id` - Update doctor profile
- `GET /api/doctors/:id/appointments` - Get doctor appointments

### Patients

- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient by ID
- `PUT /api/patients/:id` - Update patient profile
- `GET /api/patients/:id/appointments` - Get patient appointments

### Appointments

- `POST /api/appointments` - Create new appointment
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Admins

- `GET /api/admins/stats` - Get system statistics
- `GET /api/admins/users` - Get all users
- `PUT /api/admins/users/:id` - Update user status

## Environment Variables

Create a `.env` file with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hospital-management

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Server Port
PORT=3000

# Node Environment
NODE_ENV=development
```

## Default Credentials

For testing purposes, you can use these default credentials:

### Admin

- Email: admin@hospital.com
- Password: admin123

### Doctor

- Email: doctor@hospital.com
- Password: doctor123

### Patient

- Email: patient@hospital.com
- Password: patient123

**Note**: Change these credentials in production!

## Features in Detail

### Authentication & Authorization

- JWT-based authentication
- Role-based access control (Admin, Doctor, Patient)
- Secure password hashing with bcryptjs
- Protected routes with middleware

### Appointment Management

- Book appointments with available doctors
- View appointment history
- Update appointment status
- Cancel appointments

### User Management

- User registration and login
- Profile management
- Role-based dashboards
- User status management (Admin only)

### Logging

- Winston logger for application logs
- Separate error and combined logs
- Request logging middleware

## Development

### Running in Development Mode

```bash
npm run dev
```

This will start the server with nodemon for auto-reloading on file changes.

### Adding Sample Data

```bash
node add-sample-doctors.js
```

## Testing

The project includes test files for API testing:

- `test-login.json` - Login API tests
- `test-profile.json` - Profile API tests
- `test-appointment.json` - Appointment API tests

## Documentation

Additional documentation available:

- `MANUAL_TESTING_GUIDE.md` - Manual testing procedures
- `TEST_REPORT.md` - Test results and reports
- `DOCTOR_SIGNUP_ENHANCEMENT.md` - Doctor signup feature details
- `PATIENT_FIX_SUMMARY.md` - Patient module fixes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support, email support@hospital.com or open an issue in the repository.

## Acknowledgments

- Express.js team for the excellent web framework
- MongoDB team for the database
- All contributors who have helped with the project

---

**Note**: This is a demonstration project. For production use, ensure proper security measures, data validation, and compliance with healthcare regulations (HIPAA, etc.).
