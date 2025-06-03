// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAVXc7aNiGAA4cl1zNMCXPp1vRG5SAOT4A",
  authDomain: "dashboard-6fa4b.firebaseapp.com",
  projectId: "dashboard-6fa4b",
  storageBucket: "dashboard-6fa4b.firebasestorage.app",
  messagingSenderId: "836815128343",
  appId: "1:836815128343:web:5a209c7b278c773fe09952",
  measurementId: "G-CVDVCVC7RG"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)