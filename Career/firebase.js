// Import Firebase SDK (for npm)
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBw1Sc7fRZ28mWr8ozB6rMY2XYvs-r96Gw",
    authDomain: "ff-careers.firebaseapp.com",
    projectId: "ff-careers",
    storageBucket: "ff-careers.firebasestorage.app",
    messagingSenderId: "958595305310",
    appId: "1:958595305310:web:cd53bb9c2cae3ca339c9cf",
    measurementId: "G-LHF09LCYC5"
  };


// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Export auth & provider for use in auth.js
export { auth, provider };