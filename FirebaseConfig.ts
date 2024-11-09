import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQTLj2gyC8zcew3pdL8ocQXY6-OwtPJro",
  authDomain: "hack2024-2ff15.firebaseapp.com",
  projectId: "hack2024-2ff15",
  storageBucket: "hack2024-2ff15.firebasestorage.app",
  messagingSenderId: "74234212950",
  appId: "1:74234212950:web:d68ef62bb0addc29e2c1f7"
};



// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)