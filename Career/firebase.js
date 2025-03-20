// ✅ Use Firebase CDN (Ensure version 10.7.1 is latest)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


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
const db = getFirestore(app); // 🔥 Firestore database

// ✅ Export auth & provider for use in auth.js
export { auth, provider, db };