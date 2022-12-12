// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCznxLx2sW8DKSyCgjk5YeGFG0hkTMrQGo",
  authDomain: "movie-3959c.firebaseapp.com",
  projectId: "movie-3959c",
  storageBucket: "movie-3959c.appspot.com",
  messagingSenderId: "429492725105",
  appId: "1:429492725105:web:a3a673555e8d4d90fa42d0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
