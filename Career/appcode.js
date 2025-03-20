import { auth, db } from "./firebase.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// ✅ Auto logout redirect if not logged in
onAuthStateChanged(auth, (user) => {
    if (!user) {
        console.log("🔴 No user found. Redirecting to login...");
        window.location.href = "login.html"; 
    } else {
        console.log("✅ User logged in:", user.displayName);
        const userNameDisplay = document.getElementById("user-name");
        const logoImage = document.querySelector(".logo");

        if (user.photoURL && logoImage) {
            logoImage.src = user.photoURL; // Replace logo.png with user's Google profile picture
        }

        if (userNameDisplay) {
            userNameDisplay.textContent = user.displayName || "User";
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("rating-popup");
    if (popup) popup.style.display = "none"; // Ensure popup is hidden initially

    const settingsBtn = document.getElementById("settings-btn");
    const settingsMenu = document.getElementById("settings-menu");

    if (settingsBtn && settingsMenu) {
        settingsBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            settingsMenu.style.display = settingsMenu.style.display === "block" ? "none" : "block";
            settingsBtn.classList.toggle("rotated");
        });

        document.addEventListener("click", (event) => {
            if (!settingsBtn.contains(event.target) && !settingsMenu.contains(event.target)) {
                settingsMenu.style.display = "none";
                settingsBtn.classList.remove("rotated");
            }
        });
    }

    const deleteListBtn = document.getElementById("delete-list-btn");
const listMenu = document.getElementById("list-menu");
let selectedListElement = null; // Track right-clicked list element

// ✅ Show the right-click menu when a list is right-clicked
document.addEventListener("contextmenu", (event) => {
    if (event.target.classList.contains("list-button")) {
        event.preventDefault();
        selectedListElement = event.target;

        // Position the menu near the cursor
        listMenu.style.top = `${event.clientY}px`;
        listMenu.style.left = `${event.clientX}px`;
        listMenu.style.display = "block";
    }
});

// ✅ Hide menu when clicking outside
document.addEventListener("click", (event) => {
    if (!listMenu.contains(event.target)) {
        listMenu.style.display = "none";
    }
});

// ✅ Handle the delete button inside the right-click menu
if (deleteListBtn) {
    deleteListBtn.addEventListener("click", () => {
        if (selectedListElement) {
            const listName = selectedListElement.textContent;
            if (Object.keys(lists).length === 1) {
                alert("You must have at least one list!");
                return;
            }

            delete lists[listName];
            saveListsToLocalStorage();

            // ✅ Hide menu after deleting the list
            listMenu.style.display = "none";

            // Switch to the first available list
            currentListName = Object.keys(lists)[0];
            loadLists();
            loadTasks();
        }
    });
}

    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            signOut(auth).then(() => {
                console.log("✅ User signed out. Redirecting...");
                window.location.href = "login.html";
            }).catch((error) => console.error("❌ Error signing out:", error.message));
        });
    }

    // ✅ Load lists and tasks from localStorage
    let lists = JSON.parse(localStorage.getItem("taskLists")) || {
        "To Do": ["Brainstorm icebreaker ideas", "Create hackathon agenda", "Complete physics homework"],
        "List 2": ["Review meeting notes", "Plan next week's schedule"]
    };
    
    let currentListName = Object.keys(lists)[0] || "To Do"; // Default to first list

    const taskList = document.getElementById("task-list");
    const sidebar = document.getElementById("sidebar");

    function saveListsToLocalStorage() {
        localStorage.setItem("taskLists", JSON.stringify(lists));
    }

    function loadLists() {
        sidebar.innerHTML = ""; // Clear sidebar before reloading
    
        Object.keys(lists).forEach((listName, index) => {
            const listButton = document.createElement("button");
            listButton.classList.add("list-button");
            listButton.textContent = listName;
            listButton.onclick = () => selectList(listName);
    
            if (listName === currentListName) {
                listButton.classList.add("active");
            }
    
            // ✅ Right-click context menu for deleting lists
            listButton.addEventListener("contextmenu", (event) => {
                event.preventDefault();
                selectedListElement = listButton;
            
                // ✅ Show the existing right-click menu from HTML at the cursor's position
                const listMenu = document.getElementById("list-menu");
                listMenu.style.top = `${event.clientY}px`;
                listMenu.style.left = `${event.clientX}px`;
                listMenu.style.display = "block";
            });
    
            sidebar.appendChild(listButton);
        });
    
        // ✅ Add the "+ Add List" button
        const addListButton = document.createElement("button");
        addListButton.classList.add("add-list");
        addListButton.textContent = "+ Add a List";
        addListButton.onclick = addList;
        sidebar.appendChild(addListButton);
    }
    
    // ✅ Function to delete list and update localStorage
    function deleteList(listName) {
        if (Object.keys(lists).length === 1) {
            alert("You must have at least one list!");
            return;
        }
    
        delete lists[listName];
        saveListsToLocalStorage();
    
        // Switch to first available list
        currentListName = Object.keys(lists)[0];
        loadLists();
        loadTasks();
    }

    function loadTasks() {
        taskList.innerHTML = ""; // Clear task list

        (lists[currentListName] || []).forEach((task, index) => {
            const taskItem = document.createElement("div");
            taskItem.classList.add("task");

            const circle = document.createElement("span");
            circle.classList.add("circle");
            circle.textContent = "○";
            circle.onclick = () => deleteTask(index);

            const taskText = document.createElement("span");
            taskText.textContent = task;

            taskItem.appendChild(circle);
            taskItem.appendChild(taskText);
            taskList.appendChild(taskItem);
        });
    }

    function selectList(listName) {
        if (listName === currentListName) return;
        currentListName = listName;

        document.querySelectorAll(".list-button").forEach((button) => {
            button.classList.toggle("active", button.textContent === listName);
        });

        loadTasks();
    }

    function addTask() {
        if (document.getElementById("task-input")) return;

        const inputContainer = document.createElement("div");
        inputContainer.classList.add("task-entry");

        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.id = "task-input";
        inputField.placeholder = "Enter task name...";
        inputField.classList.add("task-input");

        const enterButton = document.createElement("button");
        enterButton.textContent = "Enter";
        enterButton.classList.add("enter-button");

        inputContainer.appendChild(inputField);
        inputContainer.appendChild(enterButton);
        taskList.appendChild(inputContainer);

        inputField.focus();

        enterButton.onclick = () => saveTask(inputField.value);
        inputField.addEventListener("keypress", (e) => {
            if (e.key === "Enter") saveTask(inputField.value);
        });
    }

    function saveTask(taskText) {
        if (taskText.trim() === "") return;
        lists[currentListName].push(taskText);
        saveListsToLocalStorage();
        loadTasks();
        document.querySelector(".task-entry").remove();
    }

    function deleteTask(index) {
        const sound = new Audio("done1.mp3");
        sound.play();

        const taskName = lists[currentListName][index];

        showRatingPopup(taskName, () => {
            lists[currentListName].splice(index, 1);
            saveListsToLocalStorage();
            loadTasks();
        });
    }

    function addList() {
        const newListName = prompt("Enter new list name:");
        if (newListName && !lists[newListName]) {
            lists[newListName] = [];
            saveListsToLocalStorage();
            loadLists();
            selectList(newListName);
        }
    }

    function showRatingPopup(taskName, callback) {
        const popup = document.getElementById("rating-popup");
        const taskMessage = document.getElementById("popup-task-message");
        const stars = document.querySelectorAll(".star");
        const closeButton = document.getElementById("close-popup");

        taskMessage.textContent = `How much did you enjoy completing "${taskName}"?`;
        popup.style.display = "flex";
        stars.forEach(star => star.classList.remove("active"));

        stars.forEach(star => {
            star.replaceWith(star.cloneNode(true));
        });

        const newStars = document.querySelectorAll(".star");
        newStars.forEach(star => {
            star.addEventListener("click", () => {
                newStars.forEach(s => s.classList.remove("active"));
                star.classList.add("active");

                let value = star.getAttribute("data-value");
                for (let i = 0; i < value; i++) {
                    newStars[i].classList.add("active");
                }
            });
        });

        closeButton.replaceWith(closeButton.cloneNode(true));
        const newCloseButton = document.getElementById("close-popup");

        newCloseButton.addEventListener("click", () => {
            const sound = new Audio("done2.mp3");
            sound.play();
            popup.style.display = "none";
            callback();
        });

        popup.addEventListener("click", (event) => {
            if (event.target === popup) {
                popup.style.display = "none";
            }
        });
    }

    document.querySelector(".add-task").onclick = addTask;
    loadLists();
    loadTasks();
});