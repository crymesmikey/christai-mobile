# ChristAI Configuration Checklist

Use this checklist to ensure all external services are properly configured.

## ✅ Configuration Steps

### 1. Firebase Setup
- [ ] Created Firebase project
- [ ] Enabled Email/Password authentication
- [ ] Generated service account key
- [ ] Converted service account to base64
- [ ] Created Realtime Database
- [ ] Copied Firebase web config

### 2. OpenAI Setup
- [ ] Created OpenAI account
- [ ] Generated API key
- [ ] Verified API key has credits/quota

### 3. Server Configuration
- [ ] Created `server/.env` file
- [ ] Added `OPENAI_API_KEY`
- [ ] Added `FIREBASE_SERVICE_ACCOUNT_BASE64`
- [ ] Added `FIREBASE_DATABASE_URL`

### 4. Mobile App Configuration
- [ ] Updated `app/app.json` with Firebase config
- [ ] Verified `backendUrl` points to correct server

### 5. Testing
- [ ] Server starts without errors
- [ ] Can access health endpoint: http://localhost:3000/api/health
- [ ] Mobile app connects to server
- [ ] User registration works
- [ ] User login works
- [ ] Chat functionality works

## 🔧 Quick Commands

### Start Backend Server
```bash
cd server
npm run dev
```

### Start Mobile App
```bash
cd app
npx expo start
```

### Test Server Health
```bash
curl http://localhost:3000/api/health
```

## 🚨 Common Issues

1. **"Firebase service account key not found"**
   - Check that FIREBASE_SERVICE_ACCOUNT_BASE64 is set in .env
   - Ensure base64 string is complete (no line breaks)

2. **"OpenAI API key not found"**
   - Verify OPENAI_API_KEY is set in .env
   - Check API key format (should start with 'sk-')

3. **"Network request failed"**
   - Ensure backend server is running
   - Check that mobile app's backendUrl matches server address

4. **Authentication errors**
   - Verify Firebase Auth is enabled
   - Check Firebase config in app.json

## 📝 Environment Variables Template

Copy this to your `server/.env` file:

```
OPENAI_API_KEY=sk-your-openai-key-here
FIREBASE_SERVICE_ACCOUNT_BASE64=your-base64-encoded-service-account-here
FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com/
PORT=3000
```

## 🔐 Security Reminders

- Never commit .env files
- Keep API keys secure
- Use test mode for initial setup
- Configure proper Firebase security rules for production