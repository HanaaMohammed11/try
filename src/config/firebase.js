/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDG9a3D9mlR2YrPTTap18xUG4_PWGcfc6U",
  authDomain: "masfofa-e7430.firebaseapp.com",
  projectId: "masfofa-e7430",
  storageBucket: "masfofa-e7430.appspot.com",
  messagingSenderId: "450950014501",
  appId: "1:450950014501:web:43c6a630e2756046a281cc",
  measurementId: "G-E28YH8RZ2C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export default db;
