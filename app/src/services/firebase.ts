import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.firebase.apiKey,
  authDomain: Constants.expoConfig?.extra?.firebase.authDomain,
  projectId: Constants.expoConfig?.extra?.firebase.projectId,
  storageBucket: Constants.expoConfig?.extra?.firebase.storageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.firebase.messagingSenderId,
  appId: Constants.expoConfig?.extra?.firebase.appId,
  measurementId: Constants.expoConfig?.extra?.firebase.measurementId,
};

// Initialize Firebase app only if it hasn't been initialized
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = getAuth(app);

export { app, auth }; 