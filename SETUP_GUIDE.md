# ChristAI Mobile App Setup Guide

This guide will help you configure the external services required for the ChristAI mobile application.

## Prerequisites

- Node.js and npm installed
- Expo CLI (`npm install -g @expo/cli`)
- A Firebase account
- An OpenAI account

## Step 1: Firebase Setup

### 1.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `christai-mobile` (or your preferred name)
4. Follow the setup wizard

### 1.2 Enable Authentication
1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Save the changes

### 1.3 Get Web App Configuration
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select Web (</>) icon
4. Register your app with nickname: `christai-web`
5. Copy the Firebase configuration object

### 1.4 Generate Service Account Key
1. Go to Project Settings > Service accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Convert to base64: `cat serviceAccountKey.json | base64`
5. Copy the base64 string (it will be very long)

### 1.5 Get Database URL
1. Go to "Realtime Database" in Firebase Console
2. Click "Create Database"
3. Choose your security rules (start in test mode)
4. Copy the database URL (format: https://your-project-id-default-rtdb.firebaseio.com/)

## Step 2: OpenAI Setup

### 2.1 Get API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Go to API Keys section
4. Click "Create new secret key"
5. Copy the API key (starts with sk-)

## Step 3: Configure the Application

### 3.1 Update Server Environment Variables
1. Open `server/.env` file
2. Fill in the values:
   ```
   OPENAI_API_KEY=sk-your-openai-api-key-here
   FIREBASE_SERVICE_ACCOUNT_BASE64=your-very-long-base64-string-here
   FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com/
   ```

### 3.2 Update Mobile App Configuration
1. Open `app/app.json`
2. Update the `extra` section with your Firebase config:
   ```json
   "extra": {
     "eas": {
       "projectId": "YOUR_EAS_PROJECT_ID"
     },
     "backendUrl": "http://localhost:3000/api",
     "firebaseApiKey": "your-firebase-api-key",
     "firebaseAuthDomain": "your-project-id.firebaseapp.com",
     "firebaseProjectId": "your-project-id",
     "firebaseStorageBucket": "your-project-id.appspot.com",
     "firebaseMessagingSenderId": "your-messaging-sender-id",
     "firebaseAppId": "your-app-id"
   }
   ```

## Step 4: Install Dependencies and Run

### 4.1 Install Server Dependencies
```bash
cd server
npm install
```

### 4.2 Install Mobile App Dependencies
```bash
cd app
npm install
```

### 4.3 Start the Backend Server
```bash
cd server
npm run dev
```

### 4.4 Start the Mobile App
```bash
cd app
npx expo start
```

## Step 5: Testing

1. The backend server should start on http://localhost:3000
2. The Expo development server will provide QR codes for testing
3. Use Expo Go app on your phone or an emulator
4. Create an account and test the chat functionality

## Troubleshooting

### Common Issues:

1. **Firebase Authentication Error**: Make sure email/password is enabled in Firebase Console
2. **OpenAI API Error**: Verify your API key is correct and has sufficient credits
3. **Connection Error**: Ensure backend server is running on port 3000
4. **Base64 Encoding**: Make sure the service account JSON is properly base64 encoded

### Environment Variables Format:
- No quotes around values in .env file
- No spaces around the = sign
- Base64 string should be one continuous line

## Security Notes

- Never commit your `.env` file to version control
- Keep your API keys secure
- Use Firebase security rules in production
- Consider using environment-specific configurations

## Next Steps

Once everything is configured:
1. Test user registration and login
2. Test chat functionality
3. Customize the AI responses by modifying the OpenAI prompt
4. Style the app according to your brand
5. Deploy to app stores when ready