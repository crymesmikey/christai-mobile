import * as admin from 'firebase-admin';

// IMPORTANT: Replace this with your actual Firebase service account key.
// You should load this from environment variables or a secure secret manager in a real application.
// For this example, we are showing how to set it up, but you must provide your own credentials.
// The value for 'FIREBASE_SERVICE_ACCOUNT_BASE64' should be the base64 encoded string of your service account JSON file.
// Command to encode: `cat /path/to/your/serviceAccountKey.json | base64`

const serviceAccountBase64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;

if (!serviceAccountBase64) {
  console.error(
    'Firebase service account key not found. ' +
    'Please set the FIREBASE_SERVICE_ACCOUNT_BASE64 environment variable.'
  );
  // process.exit(1); // In a real app, you'd want to exit if the config is missing.
}

const serviceAccountJson = serviceAccountBase64
  ? Buffer.from(serviceAccountBase64, 'base64').toString('ascii')
  : '{}';

try {
  const serviceAccount = JSON.parse(serviceAccountJson);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
  
  console.log('Firebase Admin initialized successfully.');

} catch (error) {
    console.error('Error initializing Firebase Admin:', error);
    console.log("Please make sure you have set the FIREBASE_SERVICE_ACCOUNT_BASE64 and FIREBASE_DATABASE_URL environment variables correctly.")
}


export default admin; 