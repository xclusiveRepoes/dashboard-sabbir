// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCWc8rXByMq9N7i-Wwnnw4wyRkE9ZNANSE",
  authDomain: "dashboard-905a3.firebaseapp.com",
  projectId: "dashboard-905a3",
  storageBucket: "dashboard-905a3.firebasestorage.app",
  messagingSenderId: "525274081969",
  appId: "1:525274081969:web:8312342ccef95609461090",
  measurementId: "G-M1VT3XR1K4"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)