// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSf7gL4yjWCsRc7kMPoTOL-KdhChePQwU",
  authDomain: "interview-questions-1f508.firebaseapp.com",
  projectId: "interview-questions-1f508",
  storageBucket: "interview-questions-1f508.appspot.com",
  messagingSenderId: "74654787266",
  appId: "1:74654787266:web:967b9f0e46c9d6627c7d5b",
  measurementId: "G-CJ8FCNS2Y8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const auth = getAuth(app);

const googleAuthProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, googleAuthProvider);
