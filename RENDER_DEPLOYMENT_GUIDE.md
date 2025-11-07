# Render Deployment Guide

This guide provides step-by-step instructions for deploying the Hospital Management System on Render.

## Prerequisites

- GitHub repository with your code (✅ Already done)
- Render account (https://render.com)
- MongoDB Atlas database (for production)

## Deployment Steps

### 1. Create a New Web Service on Render

1. Log in to your Render dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `SreelekhaAnandam/Hospital-Management`
4. Configure the service:
   - **Name**: hospital-management (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: main
   - **Root Directory**: hospital-management
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or paid for better performance)

### 2. Environment Variables Configuration

Add the following environment variables in Render dashboard:

#### Required Variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hospital-management?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=production
```

#### Optional Variables:

```
PORT=3000
```

**Note**: Render automatically sets the PORT variable, so you may not need to set it manually.

### 3. MongoDB Atlas Configuration

Ensure your MongoDB Atlas is configured correctly:

1. **Whitelist Render's IP addresses**:

   - Go to MongoDB Atlas → Network Access
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0) for Render
   - Or add specific Render IP ranges

2. **Database User**:

   - Ensure you have a database user with read/write permissions
   - Use these credentials in your MONGODB_URI

3. **Connection String**:
   - Get your connection string from MongoDB Atlas
   - Replace `<username>`, `<password>`, and `<dbname>` with actual values
   - Ensure the connection string includes `?retryWrites=true&w=majority`

### 4. Verify Deployment

After deployment, Render will provide you with a URL like:

```
https://hospital-management-xxxx.onrender.com
```

#### Test the following:

1. **Homepage**: Visit your Render URL
2. **API Health Check**: `https://your-app.onrender.com/api/auth/verify`
3. **Login Page**: `https://your-app.onrender.com/login.html`
4. **Signup Page**: `https://your-app.onrender.com/signup.html`

### 5. Common Issues & Solutions

#### Issue 1: Application Not Starting

**Symptoms**: Deployment fails or service crashes
**Solutions**:

- Check Render logs for error messages
- Verify `package.json` has correct start script: `"start": "node server.js"`
- Ensure all dependencies are in `package.json`, not just `devDependencies`

#### Issue 2: Database Connection Errors

**Symptoms**: "MongooseServerSelectionError" or connection timeout
**Solutions**:

- Verify MONGODB_URI is correct in Render environment variables
- Check MongoDB Atlas Network Access allows Render IPs (0.0.0.0/0)
- Ensure database user has correct permissions
- Check if connection string includes database name

#### Issue 3: 404 Errors on Frontend

**Symptoms**: HTML pages not loading
**Solutions**:

- Verify `public` folder is included in deployment
- Check `server.js` serves static files: `app.use(express.static('public'))`
- Ensure file paths are correct (case-sensitive on Linux)

#### Issue 4: CORS Errors

**Symptoms**: API calls fail from frontend
**Solutions**:

- Verify CORS is configured in `server.js`
- Update CORS origin to include your Render URL
- Check if API endpoints are accessible

#### Issue 5: JWT Authentication Fails

**Symptoms**: Login works but subsequent requests fail
**Solutions**:

- Verify JWT_SECRET is set in Render environment variables
- Ensure JWT_SECRET is the same across all instances
- Check token expiration settings

### 6. Performance Optimization

#### For Free Tier:

- **Cold Starts**: Free tier services spin down after inactivity
  - First request after inactivity may take 30-60 seconds
  - Consider using a paid plan for always-on service
  - Or use a service like UptimeRobot to ping your app periodically

#### For Better Performance:

- Upgrade to a paid plan for:
  - No cold starts
  - More CPU and RAM
  - Better response times
  - Custom domains

### 7. Monitoring & Logs

#### View Logs:

1. Go to your Render dashboard
2. Select your web service
3. Click on "Logs" tab
4. Monitor for errors and warnings

#### Key Metrics to Monitor:

- Response times
- Error rates
- Database connection status
- Memory usage
- CPU usage

### 8. Continuous Deployment

Render automatically deploys when you push to your GitHub repository:

1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
3. Render automatically detects changes and redeploys

### 9. Custom Domain (Optional)

To use a custom domain:

1. Go to your Render service settings
2. Click "Custom Domains"
3. Add your domain
4. Update DNS records as instructed by Render
5. Wait for DNS propagation (can take up to 48 hours)

### 10. Security Best Practices

#### Environment Variables:

- ✅ Never commit `.env` file to GitHub
- ✅ Use strong JWT_SECRET (at least 32 characters)
- ✅ Use strong MongoDB passwords
- ✅ Rotate secrets periodically

#### Database:

- ✅ Use MongoDB Atlas with authentication
- ✅ Limit database user permissions
- ✅ Enable MongoDB Atlas backup
- ✅ Monitor database access logs

#### Application:

- ✅ Keep dependencies updated
- ✅ Use HTTPS (Render provides this automatically)
- ✅ Implement rate limiting for APIs
- ✅ Validate all user inputs
- ✅ Sanitize data before database operations

### 11. Backup Strategy

#### Code Backup:

- ✅ GitHub repository (already done)
- Consider creating release tags for stable versions

#### Database Backup:

- Enable MongoDB Atlas automatic backups
- Schedule regular manual backups
- Test restore procedures

### 12. Scaling Considerations

As your application grows:

1. **Horizontal Scaling**: Add more instances
2. **Vertical Scaling**: Upgrade instance size
3. **Database Scaling**: Upgrade MongoDB Atlas tier
4. **Caching**: Implement Redis for session management
5. **CDN**: Use CDN for static assets

## Support & Resources

- **Render Documentation**: https://render.com/docs
- **MongoDB Atlas Documentation**: https://docs.atlas.mongodb.com/
- **Project Repository**: https://github.com/SreelekhaAnandam/Hospital-Management

## Troubleshooting Checklist

Before seeking help, verify:

- [ ] All environment variables are set correctly
- [ ] MongoDB Atlas allows connections from Render
- [ ] Database user has correct permissions
- [ ] Build command completes successfully
- [ ] Start command is correct
- [ ] Logs show no critical errors
- [ ] Dependencies are installed correctly
- [ ] Port configuration is correct

## Next Steps After Deployment

1. **Test all features**:

   - User registration and login
   - Doctor, patient, and admin dashboards
   - Appointment booking and management
   - Profile updates

2. **Set up monitoring**:

   - Configure uptime monitoring
   - Set up error tracking (e.g., Sentry)
   - Monitor database performance

3. **Documentation**:

   - Update README with production URL
   - Document any production-specific configurations
   - Create user guides if needed

4. **Security audit**:

   - Review all API endpoints
   - Test authentication and authorization
   - Check for common vulnerabilities

5. **Performance testing**:
   - Load test critical endpoints
   - Optimize slow queries
   - Implement caching where needed

---

**Congratulations!** Your Hospital Management System is now deployed on Render! 🎉
