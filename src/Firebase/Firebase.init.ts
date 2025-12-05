// Import the functions you need from the SDKs you need

import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXSxsODyguxpSHlicc661MIFN9I-6_XPc",
  authDomain: "bloodbond-b9a2f.firebaseapp.com",
  projectId: "bloodbond-b9a2f",
  storageBucket: "bloodbond-b9a2f.firebasestorage.app",
  messagingSenderId: "124001249196",
  appId: "1:124001249196:web:8090f69ecc44c279f0fc09",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
