# Firebase Service Account Setup

You still need to complete one more step to fully configure Firebase authentication for the backend server.

## Generate Firebase Service Account Key

1. **Go to Firebase Console**: https://console.firebase.google.com/project/christai-58eaf
2. **Navigate to Project Settings**: Click the gear icon ⚙️ in the left sidebar
3. **Go to Service Accounts tab**: Click on "Service accounts" tab
4. **Generate new private key**: Click "Generate new private key" button
5. **Download the JSON file**: Save it as `serviceAccountKey.json`

## Convert to Base64

After downloading the service account JSON file, you need to convert it to base64:

### On Mac/Linux:
```bash
cat serviceAccountKey.json | base64
```

### On Windows (PowerShell):
```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("serviceAccountKey.json"))
```

### Online Tool (if needed):
You can also use an online base64 encoder, but be cautious with sensitive data.

## Update the .env File

1. Copy the entire base64 string (it will be very long - several lines)
2. Open `server/.env`
3. Replace `your_base64_encoded_service_account_json_here` with your base64 string
4. Make sure it's all on one line with no spaces

Example:
```
FIREBASE_SERVICE_ACCOUNT_BASE64=eyJ0eXBlIjoic2VydmljZV9hY2NvdW50IiwicHJvamVjdF9pZCI6ImNocmlzdGFpLTU4ZWFmIiwicHJpdmF0ZV9rZXlfaWQiOiI...very-long-string...
```

## Enable Authentication in Firebase

Make sure Email/Password authentication is enabled:

1. Go to Firebase Console > Authentication
2. Click "Get started" if you haven't already
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Save changes

## Test the Configuration

After completing these steps:

1. Start the server: `cd server && npm run dev`
2. Check health status: visit http://localhost:3000/api/health
3. You should see all services as "configured"

The response should look like:
```json
{
  "server": "running",
  "openai": "configured",
  "firebase": "configured"
}
```