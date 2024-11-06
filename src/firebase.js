import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database"; // Import Realtime Database methods

const firebaseConfig = {
  apiKey: "AIzaSyA1PXKtvbCVPwVyfCW8VCqXU8PxmCHkPSo",
  authDomain: "codehub-2fd81.firebaseapp.com",
  projectId: "codehub-2fd81",
  storageBucket: "codehub-2fd81.appspot.com",
  messagingSenderId: "933865890265",
  appId: "1:933865890265:web:0d26d515723a5a2dcef9c8",
  measurementId: "G-KNQPXM0QVT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Firebase Realtime Database
const database = getDatabase(app);

export { auth, database, ref, set, get }; // Export the necessary functions for database operations
