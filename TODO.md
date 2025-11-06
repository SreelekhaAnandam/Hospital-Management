# TODO: Fix Patient Login Issue

## Steps to Resolve

- [x] Set default environment variables in server.js for JWT_SECRET and MONGODB_URI if not set
- [x] Add a temporary route in auth.js to create a test patient user for testing
- [x] Run the server to check if it starts without errors
- [x] Use debug route to list users (if possible)
- [x] Test login with the test user
- [x] Remove temporary code after fixing
- [x] Fix login.html JavaScript - add missing script tag and event listener
- [x] Ensure frontend accesses via http://localhost:5000 to avoid CORS
- [x] Update login.html to use hardcoded localhost URL for API calls to avoid CORS when opening file directly

## Current Analysis

- Login flow seems correct, but likely no users in DB or env vars missing
- Patient model exists but login uses User model
- Need to ensure database connection and user creation works
- login.html has broken JavaScript - missing <script> tag and event listener
- User must access login.html via server URL, not file://

## Test Results

- Server running on port 5000
- Database connected (users found in debug route)
- Test user 'testpatient' exists with password 'password'
- API login works: curl returns token and user object
- Frontend login.html recreated with proper JS
- Frontend signup.html recreated with proper JS
- Access frontend via http://localhost:5000/login.html to avoid CORS
- Updated login.html to use hardcoded localhost URL for API calls
