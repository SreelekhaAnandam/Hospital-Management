# Manual Testing Guide for Patient Portal

## ✅ Backend Status: WORKING

The backend APIs have been tested and are functioning correctly:

- Login API: ✅ Working
- Patient Profile API: ✅ Working
- Appointments API: ✅ Working

## 🔧 What You Need to Do

Since you mentioned "the patient login portal is not working," here's what you need to test manually:

---

## Step-by-Step Testing Instructions

### 1. Open the Login Page

1. Open your web browser (Chrome, Firefox, Edge, etc.)
2. Navigate to: **http://localhost:5000/login.html**
3. You should see a login form with:
   - Role dropdown (Patient selected by default)
   - Username field
   - Password field
   - Login button

### 2. Test with Existing User

Use these test credentials that were created during backend testing:

**Test Account:**

- **Username**: `testpatient123`
- **Password**: `test123`
- **Role**: Patient (already selected)

**Steps:**

1. Enter username: `testpatient123`
2. Enter password: `test123`
3. Make sure "Patient" is selected in the role dropdown
4. Click "Login" button

**Expected Result:**

- You should be redirected to: `http://localhost:5000/patient.html`
- The patient dashboard should load

### 3. If Login Doesn't Work - Check Browser Console

**How to Open Browser Console:**

- **Chrome/Edge**: Press `F12` or `Ctrl+Shift+I`
- **Firefox**: Press `F12` or `Ctrl+Shift+K`

**What to Look For:**

1. Click on the "Console" tab
2. Try logging in again
3. Look for any error messages (they will be in red)
4. Common issues:
   - CORS errors
   - Network errors
   - JavaScript errors

**Take a screenshot of any errors and share them with me.**

---

## 4. Create a New Patient Account (Alternative Test)

If the test account doesn't work, create a new one:

### Step 4.1: Go to Signup Page

1. Navigate to: **http://localhost:5000/signup.html**
2. Fill in the form:
   - **Role**: Select "Patient"
   - **Full Name**: Your Name
   - **Email**: youremail@test.com
   - **Username**: mypatient123
   - **Password**: mypass123
3. Click "Sign Up"

**Expected Result:**

- You should see "Account created successfully!"
- You'll be redirected to the login page

### Step 4.2: Login with New Account

1. On the login page, enter:
   - **Username**: mypatient123
   - **Password**: mypass123
   - **Role**: Patient
2. Click "Login"

**Expected Result:**

- Redirect to patient dashboard

---

## 5. Test Patient Dashboard

Once logged in, you should see:

### Dashboard Elements:

- ✅ Welcome message with your name
- ✅ "Complete your profile first" message (if profile not created)
- ✅ "Manage Profile" button
- ✅ "Book Appointment" button
- ✅ "System Checklist" button
- ✅ "Logout" button

### Test Actions:

1. **Click "Manage Profile"**

   - Should redirect to profile form
   - Fill in all required fields:
     - Name, Age, Gender, Blood Group
     - Symptoms (type and press Enter)
     - Medical History (type and press Enter)
     - Allergies (type and press Enter)
     - Emergency Contact details
   - Click "Save Profile"
   - Should redirect back to dashboard

2. **After Profile is Complete:**

   - Dashboard should show your profile information
   - "Your Appointments" section should appear
   - "Book Appointment" button should be enabled

3. **Click "Book Appointment"**

   - Should redirect to appointment booking page
   - Select hospital, disease, date, time
   - Click "Proceed to Doctor Selection"
   - Select a doctor and time slot
   - Confirm appointment
   - Should see confirmation page

4. **Return to Dashboard**
   - Your appointment should appear in "Your Appointments" section

---

## 6. Common Issues and Solutions

### Issue 1: "Cannot connect to server"

**Solution:**

- Make sure the server is running
- Check if you can access: http://localhost:5000
- Restart the server: `npm start` in the hospital-management folder

### Issue 2: "Invalid credentials"

**Solution:**

- Double-check username and password
- Make sure "Patient" role is selected
- Try creating a new account

### Issue 3: Page is blank or not loading

**Solution:**

- Check browser console for errors (F12)
- Try a different browser
- Clear browser cache (Ctrl+Shift+Delete)
- Make sure you're accessing via http://localhost:5000, not file://

### Issue 4: "Profile not found" error

**Solution:**

- This is normal for new accounts
- Click "Manage Profile" to create your profile
- Fill in all required fields and save

### Issue 5: Appointments not showing

**Solution:**

- Make sure you completed your profile first
- Try refreshing the page
- Check browser console for errors

---

## 7. What to Report Back

Please test the above steps and let me know:

### ✅ What Works:

- [ ] Can access login page
- [ ] Can login successfully
- [ ] Dashboard loads correctly
- [ ] Can create/edit profile
- [ ] Can book appointments
- [ ] Appointments appear on dashboard

### ❌ What Doesn't Work:

- Describe the specific issue
- What page/action causes the problem
- Any error messages you see
- Screenshot of browser console errors

---

## 8. Quick Verification Checklist

Run through this quick checklist:

1. **Server Running?**

   ```
   Open: http://localhost:5000
   Should see: Hospital Management System homepage
   ```

2. **Login Page Loads?**

   ```
   Open: http://localhost:5000/login.html
   Should see: Login form with role dropdown
   ```

3. **Can Login?**

   ```
   Username: testpatient123
   Password: test123
   Should redirect to: patient dashboard
   ```

4. **Dashboard Loads?**

   ```
   Should see: Welcome message and buttons
   ```

5. **Profile Page Works?**
   ```
   Click: Manage Profile
   Should see: Profile form
   ```

---

## 9. Browser Developer Tools Guide

### How to Check Network Requests:

1. Press F12 to open Developer Tools
2. Click "Network" tab
3. Try logging in
4. Look for the request to `/api/auth/login`
5. Click on it to see:
   - Request payload (what was sent)
   - Response (what was received)
   - Status code (should be 200 for success)

### How to Check Console Errors:

1. Press F12 to open Developer Tools
2. Click "Console" tab
3. Look for red error messages
4. Take a screenshot if you see errors

---

## 10. Test Credentials Summary

### Existing Test Account:

- **Username**: testpatient123
- **Password**: test123
- **Role**: patient
- **Status**: Profile created, 1 appointment exists

### Create Your Own:

- Go to: http://localhost:5000/signup.html
- Choose any username/password
- Role: Patient
- Complete profile after login

---

## Need Help?

If you encounter any issues:

1. **Check browser console** (F12 → Console tab)
2. **Take screenshots** of any errors
3. **Note the exact step** where it fails
4. **Share the error messages** with me

I'll help you fix any issues you encounter!

---

**Server URL**: http://localhost:5000
**Login Page**: http://localhost:5000/login.html
**Signup Page**: http://localhost:5000/signup.html
**Dashboard**: http://localhost:5000/patient.html (after login)
