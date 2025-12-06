import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyB9bkngZ4pGzVH2oJJdkaE44zB-F5m-qbI",
  authDomain: "swiftstore-3140e.firebaseapp.com",
  projectId: "swiftstore-3140e",
  storageBucket: "swiftstore-3140e.firebasestorage.app",
  messagingSenderId: "39758276240",
  appId: "1:39758276240:web:89d33f3cadd66d670c5a15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Realtime Database
export const database = getDatabase(app);

// Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
