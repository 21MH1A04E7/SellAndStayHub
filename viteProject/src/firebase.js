// Your web app's Firebase configuration
import { initializeApp } from 'firebase/app';
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "stayandsell.firebaseapp.com",
    projectId: "stayandsell",
    storageBucket: "stayandsell.appspot.com",
    messagingSenderId: "1056741436628",
    appId: "1:1056741436628:web:6f78b5e226704fa4e9df41"
  };
  
  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);