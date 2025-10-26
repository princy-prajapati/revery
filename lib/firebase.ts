// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB6SHN4vs7vgNLD3barhLzMozzoh7PFjRY",
  authDomain: "revery-fashion-project.firebaseapp.com",
  projectId: "revery-fashion-project",
  storageBucket: "revery-fashion-project.firebasestorage.app",
  messagingSenderId: "938515206359",
  appId: "1:938515206359:web:9b32b130f13ec3ae41e092",
  measurementId: "G-8002T6GPMN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics only on client side
let analytics: any = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { auth, db, analytics };
export default app;
