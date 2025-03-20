// Import from firebase.js (npm-installed Firebase)
import { auth, provider } from "./firebase.js";
import { signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
                window.location.href = "app.html"; // Redirect to app.html after login
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
    
            // ✅ Redirect to `app.html` ONLY if on `login.html`
            if (window.location.pathname.includes("login.html")) {
                console.log("🔄 Redirecting to app.html because user is already logged in...");
                window.location.href = "app.html";
            }
    
            // Hide login button, show logout button
            const loginBtn = document.getElementById("login");
            const logoutBtn = document.getElementById("logout");
            if (loginBtn && logoutBtn) {
                loginBtn.style.display = "none";
                logoutBtn.style.display = "block";
            }
        } else {
            console.log("🔹 No user signed in");
    
            // Ensure login button is visible, hide logout button
            const loginBtn = document.getElementById("login");
            const logoutBtn = document.getElementById("logout");
            if (loginBtn && logoutBtn) {
                loginBtn.style.display = "block";
                logoutBtn.style.display = "none";
            }
        }
    });
});