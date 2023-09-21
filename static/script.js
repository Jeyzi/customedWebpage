// Function to create a new task element with a close/delete button
        function createTaskElement(taskText) {
            const listItem = document.createElement("li");
            listItem.textContent = taskText;

            // Create a close button for the task
            const closeBtn = document.createElement("span");
            closeBtn.textContent = "\u00D7";
            closeBtn.className = "close";
            closeBtn.addEventListener("click", function() {
                listItem.remove(); // Remove the task when the close button is clicked
                saveTasksToLocalStorage();
            });

            // Append the close button to the task
            listItem.appendChild(closeBtn);

            return listItem;
        }

        // Function to add a task to the list
        function addTask() {
            const taskInput = document.getElementById("taskInput");
            const taskList = document.getElementById("taskList");
            const taskText = taskInput.value.trim();

            if (taskText !== "") {
                const listItem = createTaskElement(taskText);
                taskList.appendChild(listItem);
                taskInput.value = "";
                saveTasksToLocalStorage();
            }
        }

        // Event listener to add a task when the "Add" button is clicked
        document.querySelector(".addBtn").addEventListener("click", addTask);

        // Function to save tasks to local storage
        function saveTasksToLocalStorage() {
            const taskList = document.getElementById("taskList");
            const tasks = [];

            // Get all task text from list items
            taskList.querySelectorAll("li").forEach((li) => {
                tasks.push(li.textContent);
            });

            // Store tasks in local storage as a JSON string
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }

        // Event listener to save tasks when the "Save Changes" button is clicked
        document.getElementById("saveToLocalStorage").addEventListener("click", saveTasksToLocalStorage);

        // Function to load tasks from local storage
        function loadTasksFromLocalStorage() {
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

            // Populate the task list with the loaded tasks
            const taskList = document.getElementById("taskList");
            taskList.innerHTML = "";
            tasks.forEach((taskText) => {
                const listItem = createTaskElement(taskText);
                taskList.appendChild(listItem);
            });
        }

        // Load tasks from local storage when the page loads
        loadTasksFromLocalStorage();