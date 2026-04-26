import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// These values rely on your standard .env.local setup from Firebase Console.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
