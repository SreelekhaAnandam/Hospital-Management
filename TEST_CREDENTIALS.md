# Test Credentials for Hospital Management System

## How to Access the Application

1. Make sure the server is running: `npm start`
2. Open your browser and go to: `http://localhost:5000/login.html`

## Test User Credentials

### Patient Login

- **Username**: testpatient
- **Password**: password
- **Role**: patient

### Doctor Login

- **Username**: testdoctor
- **Password**: password
- **Role**: doctor

### Admin Login

- **Username**: testadmin
- **Password**: password
- **Role**: admin

## Testing Steps

### 1. Test Patient Login

1. Go to http://localhost:5000/login.html
2. Select Role: Patient
3. Enter username: testpatient
4. Enter password: password
5. Click Login
6. Should redirect to http://localhost:5000/patient.html

### 2. Test Doctor Login

1. Go to http://localhost:5000/login.html
2. Select Role: Doctor
3. Enter username: testdoctor
4. Enter password: password
5. Click Login
6. Should redirect to http://localhost:5000/doctor.html

### 3. Test Admin Login

1. Go to http://localhost:5000/login.html
2. Select Role: Admin
3. Enter username: testadmin
4. Enter password: password
5. Click Login
6. Should redirect to http://localhost:5000/admin.html

### 4. Test Signup

1. Go to http://localhost:5000/signup.html
2. Fill in all fields
3. Click Sign Up
4. Should redirect to login page

## API Testing with curl

### Test Login API

```bash
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d "{\"username\":\"testpatient\",\"password\":\"password\",\"role\":\"patient\"}"
```

### Test Register API

```bash
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d "{\"username\":\"newuser\",\"password\":\"password\",\"role\":\"patient\",\"name\":\"New User\",\"email\":\"newuser@test.com\"}"
```

## Important Notes

- Always access the application via `http://localhost:5000/` URLs, NOT by opening HTML files directly
- The server must be running on port 5000
- MongoDB must be connected
- All redirects now use absolute URLs to avoid CORS issues
