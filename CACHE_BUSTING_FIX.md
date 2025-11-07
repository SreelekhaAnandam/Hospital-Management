# Cache Busting Fix for "Cannot Connect to Server" Error

## Problem

After deploying the API base URL fix to Render, users were still seeing "Cannot connect to server" error due to browser caching the old `api.js` file.

## Root Cause

Browsers cache JavaScript files aggressively. Even though the updated `api.js` file with dynamic URL detection was deployed to Render, browsers were still using the cached version with the hardcoded `localhost:5000` URL.

## Solution Applied

Added version parameter (`?v=2`) to all `api.js` script tags to force browsers to load the new version.

### Files Modified

1. `public/patient.html` - Changed `<script src="js/api.js">` to `<script src="js/api.js?v=2">`
2. `public/patientProfile.html` - Changed `<script src="js/api.js">` to `<script src="js/api.js?v=2">`
3. `public/doctor.html` - Changed `<script src="js/api.js">` to `<script src="js/api.js?v=2">`
4. `public/doctorList.html` - Changed `<script src="js/api.js">` to `<script src="js/api.js?v=2">`

## How to Clear Browser Cache (For Users)

### Google Chrome

1. Press `Ctrl + Shift + Delete` (Windows/Linux) or `Cmd + Shift + Delete` (Mac)
2. Select "Cached images and files"
3. Click "Clear data"
4. Refresh the page with `Ctrl + F5` (hard refresh)

### Mozilla Firefox

1. Press `Ctrl + Shift + Delete` (Windows/Linux) or `Cmd + Shift + Delete` (Mac)
2. Select "Cache"
3. Click "Clear Now"
4. Refresh the page with `Ctrl + F5` (hard refresh)

### Microsoft Edge

1. Press `Ctrl + Shift + Delete`
2. Select "Cached images and files"
3. Click "Clear now"
4. Refresh the page with `Ctrl + F5` (hard refresh)

### Safari

1. Press `Cmd + Option + E` to empty caches
2. Or go to Safari > Preferences > Advanced > Show Develop menu
3. Then Develop > Empty Caches
4. Refresh the page with `Cmd + R`

## Alternative Solutions

### 1. Use Incognito/Private Window

Open the application in an incognito/private browsing window:

- Chrome: `Ctrl + Shift + N`
- Firefox: `Ctrl + Shift + P`
- Edge: `Ctrl + Shift + N`
- Safari: `Cmd + Shift + N`

### 2. Add URL Parameter

Add a random parameter to the URL to bypass cache:

```
https://hospital-management-ejie.onrender.com/login.html?nocache=1
```

### 3. Disable Cache in DevTools (For Testing)

1. Open DevTools (`F12`)
2. Go to Network tab
3. Check "Disable cache"
4. Keep DevTools open while testing

## Verification

After clearing cache or using the new version, verify the fix by:

1. Open browser DevTools (`F12`)
2. Go to Console tab
3. Check that `API_BASE_URL` is set correctly:

   ```javascript
   console.log(API_BASE_URL);
   // Should show: https://hospital-management-ejie.onrender.com
   ```

4. Try logging in or making an API call
5. Check Network tab to see requests going to the correct URL

## For Future Deployments

To prevent this issue in future deployments:

1. **Always increment the version number** when updating `api.js`:

   ```html
   <script src="js/api.js?v=3"></script>
   ```

2. **Use build tools** that automatically add hash-based cache busting:

   ```html
   <script src="js/api.js?hash=abc123"></script>
   ```

3. **Set proper cache headers** in the server configuration:

   ```javascript
   // In server.js
   app.use(
     express.static("public", {
       maxAge: "1h", // Cache for 1 hour
       etag: true,
     })
   );
   ```

4. **Implement service workers** for better cache control in production

## Deployment Timeline

- **Initial Deployment**: API base URL fix deployed (commit 4cbe0de)
- **Cache Issue Identified**: Users reported still seeing "Cannot connect to server"
- **Cache Busting Fix**: Added `?v=2` parameter (commit 0af5a31)
- **Status**: Fix deployed and auto-deploying to Render

## Testing Checklist

After the new deployment completes:

- [ ] Clear browser cache
- [ ] Test login page
- [ ] Test signup page
- [ ] Test patient dashboard
- [ ] Test doctor dashboard
- [ ] Test appointment booking
- [ ] Verify API calls in Network tab
- [ ] Test in different browsers
- [ ] Test in incognito mode

## Support

If you're still experiencing issues after:

1. Clearing browser cache
2. Trying incognito mode
3. Waiting for Render deployment to complete (usually 2-3 minutes)

Please check:

- Render deployment logs for any errors
- Browser console for JavaScript errors
- Network tab for failed requests

---

**Last Updated**: November 7, 2025  
**Deployment URL**: https://hospital-management-ejie.onrender.com  
**Status**: ✅ Fix deployed and active
