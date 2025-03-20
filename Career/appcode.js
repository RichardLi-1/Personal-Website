document.addEventListener("DOMContentLoaded", () => {
    let lists = [
        ["Complete analysis on 2025 election",
         "Brainstorm ideas for political rhetoric essay",
         "Complete Trump discussion post"],

        ["Review meeting notes",
         "Plan next week's schedule"]
    ];

    let currentListIndex = 0;
    let selectedListElement = null; // Track the right-clicked list

    const taskList = document.getElementById("task-list");
    const sidebar = document.getElementById("sidebar");
    const listMenu = document.getElementById("list-menu");
    const deleteListBtn = document.getElementById("delete-list-btn");

    function loadTasks() {
        taskList.innerHTML = ""; // Clear previous tasks

        lists[currentListIndex]?.forEach((task, index) => {
            const taskItem = document.createElement("div");
            taskItem.classList.add("task");

            // Create delete circle button (○)
            const circle = document.createElement("span");
            circle.classList.add("circle");
            circle.textContent = "○";
            circle.onclick = () => deleteTask(index);

            // Create task text
            const taskText = document.createElement("span");
            taskText.textContent = task;

            // Append elements to task item
            taskItem.appendChild(circle);
            taskItem.appendChild(taskText);
            taskList.appendChild(taskItem);
        });
    }

    function deleteTask(index) {
        const sound = new Audio("delete-sound.mp3");
        sound.play();

        lists[currentListIndex].splice(index, 1);
        loadTasks();
    }

    function selectList(index) {
        if (index === currentListIndex) return;
        currentListIndex = index;

        document.querySelectorAll(".list-button").forEach((button, i) => {
            button.classList.toggle("active", i === index);
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
        lists[currentListIndex].push(taskText);
        loadTasks();

        document.querySelector(".task-entry").remove();
    }

    function addList() {
        const newListName = prompt("Enter new list name:");
        if (newListName) {
            lists.push([]); // Create an empty task list
            const newIndex = lists.length - 1;

            const newListButton = document.createElement("button");
            newListButton.classList.add("list-button");
            newListButton.textContent = newListName;
            newListButton.onclick = () => selectList(newIndex);

            newListButton.addEventListener("contextmenu", (event) => openListMenu(event, newListButton));

            sidebar.insertBefore(newListButton, document.querySelector(".add-list"));

            updateListEventListeners();
            selectList(newIndex);
        }
    }

    function openListMenu(event, listElement) {
        event.preventDefault();
        selectedListElement = listElement;

        listMenu.style.top = `${event.clientY}px`;
        listMenu.style.left = `${event.clientX}px`;
        listMenu.style.display = "block";
    }

    function updateListEventListeners() {
        document.querySelectorAll(".list-button").forEach((button, index) => {
            button.onclick = () => selectList(index);
            button.addEventListener("contextmenu", (event) => openListMenu(event, button));
        });
    }

    deleteListBtn.addEventListener("click", () => {
        if (selectedListElement) {
            const listButtons = Array.from(sidebar.querySelectorAll(".list-button"));
            const selectedIndex = listButtons.indexOf(selectedListElement);

            if (listButtons.length > 2) { // Ensure at least one list remains
                selectedListElement.remove();
                lists.splice(selectedIndex, 1);

                // Select the closest valid list
                const newSelectedIndex = Math.max(0, selectedIndex - 1);
                selectList(newSelectedIndex);
                listMenu.style.display = "none";

                updateListEventListeners();
            } else {
                alert("You must have at least one list!");
            }
        }
    });

    document.addEventListener("click", (event) => {
        if (!listMenu.contains(event.target)) {
            listMenu.style.display = "none";
        }
    });

    document.querySelector(".add-task").onclick = addTask;
    document.querySelector(".add-list").onclick = addList;

    updateListEventListeners();
    loadTasks();
});