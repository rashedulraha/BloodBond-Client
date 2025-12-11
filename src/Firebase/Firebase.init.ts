// Import the functions you need from the SDKs you need

import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbY7gZz3QAAx6eSaeageoNC2p1u6HCLUU",
  authDomain: "bloodbond-1adac.firebaseapp.com",
  projectId: "bloodbond-1adac",
  storageBucket: "bloodbond-1adac.firebasestorage.app",
  messagingSenderId: "890265174006",
  appId: "1:890265174006:web:c141a5fac8db4e906251d7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
