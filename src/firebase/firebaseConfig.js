import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Basic runtime validation to help surface missing environment variables
const required = [
  'apiKey',
  'authDomain',
  'projectId',
  'appId',
];

const missing = required.filter((key) => !firebaseConfig[key]);
if (missing.length) {
  console.error(
    `Missing Firebase configuration keys: ${missing.join(', ')}.\n` +
      'Create a .env.local with VITE_FIREBASE_* values from your Firebase project and restart the dev server.'
  );
  throw new Error('Firebase configuration is missing. Check console for details.');
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
