// Import from firebase.js (npm-installed Firebase)
import { auth, provider } from "./firebase.js";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login");
    const logoutBtn = document.getElementById("logout");

    if (!loginBtn || !logoutBtn) {
        console.error("Login and Logout buttons not found on this page.");
        return;
    }

    // ✅ Google Sign-In
    loginBtn.addEventListener("click", () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("✅ User signed in:", result.user.displayName);
            })
            .catch((error) => {
                console.error("❌ Error signing in:", error.message);
            });
    });

    // ✅ Sign Out
    logoutBtn.addEventListener("click", () => {
        signOut(auth)
            .then(() => {
                console.log("✅ User signed out");
            })
            .catch((error) => {
                console.error("❌ Error signing out:", error.message);
            });
    });

    // ✅ Detect User Login State
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("🔹 User is logged in:", user.displayName);
            loginBtn.style.display = "none";
            logoutBtn.style.display = "block";
        } else {
            console.log("🔹 No user signed in");
            loginBtn.style.display = "block";
            logoutBtn.style.display = "none";
        }
    });
});