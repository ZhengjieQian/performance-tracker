# MongoDB Atlas Security Configuration Guide

## 🚨 IMMEDIATE ACTIONS REQUIRED

### 1. **Rotate MongoDB Atlas Credentials**

#### Step 1: Access MongoDB Atlas Dashboard
1. Go to https://cloud.mongodb.com
2. Log in to your account
3. Navigate to your project

#### Step 2: Create New Database User
1. Go to **Database Access** in the left sidebar
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Create a strong password (use password generator)
5. Set **Database User Privileges** to **Read and write to any database**
6. Click **Add User**

#### Step 3: Delete Old User (if compromised)
1. Find the potentially compromised user
2. Click the **...** menu next to the user
3. Select **Delete User**
4. Confirm deletion

### 2. **Revoke Database Access**

#### Step 1: Check Network Access
1. Go to **Network Access** in the left sidebar
2. Review all IP addresses in the whitelist
3. Remove any unauthorized or suspicious IPs
4. **CRITICAL**: Remove `0.0.0.0/0` (allows access from anywhere)

#### Step 2: Update IP Whitelist
```
Allowed IPs:
- Your application server IP: [YOUR_SERVER_IP]
- Your development machine IP: [YOUR_DEV_IP]
- Your office IP: [YOUR_OFFICE_IP]

DO NOT INCLUDE:
- 0.0.0.0/0 (allows access from anywhere)
- Unknown or suspicious IP addresses
```

### 3. **Check Security Logs**

#### Step 1: Enable Audit Logs
1. Go to **Security** → **Audit Logs**
2. Enable audit logging if not already enabled
3. Set log retention period (recommend 30+ days)

#### Step 2: Review Recent Activity
1. Go to **Security** → **Activity Feed**
2. Look for:
   - Unusual login attempts
   - Failed authentication
   - Unauthorized database access
   - Suspicious query patterns

#### Step 3: Check Database Activity
1. Go to **Monitoring** → **Real Time**
2. Review:
   - Connection patterns
   - Query performance
   - Unusual spikes in activity

### 4. **Update Application Configuration**

#### Step 1: Update Environment Variables
Create a new `.env` file in your backend directory:
```env
# MongoDB Atlas Connection (NEW CREDENTIALS)
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/performance-tracker?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# Security
JWT_SECRET=your-new-jwt-secret-here
CORS_ORIGIN=http://localhost:3000
```

#### Step 2: Test Connection
```bash
cd backend
npm run dev
```

Check console for successful connection message:
```
✅ Connected to MongoDB successfully
```

### 5. **Additional Security Measures**

#### Enable MongoDB Atlas Security Features
1. **Encryption at Rest**: Already enabled by default
2. **Encryption in Transit**: Already enabled by default
3. **Authentication**: Ensure it's enabled
4. **IP Whitelist**: Configure properly (see step 2)
5. **Audit Logs**: Enable for compliance

#### Set Up Monitoring Alerts
1. Go to **Monitoring** → **Alerts**
2. Create alerts for:
   - Failed authentication attempts
   - Unusual connection patterns
   - High query latency
   - Unauthorized access attempts

### 6. **Verify Security Implementation**

#### Test Security Measures
1. **Test from unauthorized IP**: Should be blocked
2. **Test with wrong credentials**: Should fail
3. **Test with old credentials**: Should fail
4. **Test with new credentials**: Should succeed

#### Security Checklist
- [ ] Old credentials deleted
- [ ] New credentials created
- [ ] IP whitelist updated
- [ ] Audit logs enabled
- [ ] Application updated with new credentials
- [ ] Connection tested successfully
- [ ] Monitoring alerts configured

### 7. **Emergency Contacts**

If you need immediate assistance:
- **MongoDB Atlas Support**: https://support.mongodb.com
- **Security Incident Response**: [Your security team]
- **Database Administrator**: [Your DBA contact]

### 8. **Prevention for Future**

#### Best Practices
1. **Never commit credentials to Git**
2. **Use environment variables for all secrets**
3. **Rotate credentials regularly (every 90 days)**
4. **Use strong, unique passwords**
5. **Enable 2FA on MongoDB Atlas account**
6. **Monitor access logs regularly**
7. **Use least privilege principle**

#### Regular Security Tasks
- **Weekly**: Review access logs
- **Monthly**: Check IP whitelist
- **Quarterly**: Rotate credentials
- **Annually**: Security audit

---

## ✅ **ALERT RESOLUTION CHECKLIST**

- [ ] **Step 1**: Rotated MongoDB Atlas credentials
- [ ] **Step 2**: Revoked old database access
- [ ] **Step 3**: Checked security logs for breaches
- [ ] **Step 4**: Updated application with new credentials
- [ ] **Step 5**: Verified security measures are working
- [ ] **Step 6**: **CLOSE THE ALERT AS REVOKED**

**You can now safely close the security alert!** 🎉
