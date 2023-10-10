//const openModal = document.getElementById('openModal');

//openModal.addEventListener('click', function() {
//    loadTask();
//});

const inputBox = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
// Function to create a new task element
function createTaskElement(taskText) {
    const listItem = document.createElement("li");
    listItem.textContent = taskText;

    // Create a close button for the task
    const closeBtn = document.createElement("span");
    closeBtn.textContent = "\u00D7";
    closeBtn.className = "close";
    closeBtn.addEventListener("click", function () {
        listItem.remove();
    });

    // Append the close button to the task
    listItem.appendChild(closeBtn);

    return listItem;
}

function addTask() {
    const taskText = inputBox.value.trim();
    if (taskText === '') {
        alert('You must write something!');
    } else {
        fetch('/add_task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: taskText }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadTask();
            } else {
                alert('Failed to add task');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    inputBox.value = '';
}

taskList.addEventListener('click', function(e){
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle('checked'); //Modify css for class checked
    }
    else if(e.target.tagName === 'SPAN'){
        e.target.parentElement.remove();
    }
}, false);

function loadTask() {
    fetch('/get_tasks')
        .then(response => response.json())
        .then(data => {
            taskList.innerHTML = ''; // Clear the task list
            data.forEach(taskText => {
                const listItem = createTaskElement(taskText);
                taskList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}






////save data to local storage
//function saveData(){
//    localStorage.setItem('data', taskList.innerHTML);
//}
//
////
//function loadTask(){
//    taskList.innerHTML = localStorage.getItem('data');
//}































        // Function to add a task to the list
        function addTask() {
            const taskInput = document.getElementById("taskInput");
            const taskList = document.getElementById("taskList");
            const taskText = taskInput.value.trim();

            if (taskText !== "") {
                const listItem = createTaskElement(taskText);

                // Create a close button for the task
                const closeBtn = document.createElement("span");
                closeBtn.textContent = "\u00D7";
                closeBtn.className = "close";
                closeBtn.addEventListener("click", function () {
                    listItem.remove();
                    saveTasksToLocalStorage();
                });

                // Append the close button to the task
                listItem.appendChild(closeBtn);

                taskList.appendChild(listItem);
                taskInput.value = "";
                saveTasksToLocalStorage();
            }
        }
//
//
//        // Event listener to add a task when the "Add" button is clicked
//        document.querySelector(".addBtn").addEventListener("click", addTask);
//
//        // Function to save tasks to local storage
//        function saveTasksToLocalStorage() {
//            const taskList = document.getElementById("taskList");
//            const tasks = [];
//
//            // Get all task text from list items
//            taskList.querySelectorAll("li").forEach((li) => {
//                tasks.push(li.textContent);
//            });
//
//            // Store tasks in local storage as a JSON string
//            localStorage.setItem("tasks", JSON.stringify(tasks));
//        }
//
//        // Event listener to save tasks when the "Save Changes" button is clicked
//        document.getElementById("saveToLocalStorage").addEventListener("click", saveTasksToLocalStorage);
//
//        // Function to load tasks from local storage
//        function loadTasksFromLocalStorage() {
//            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//
//            // Populate the task list with the loaded tasks
//            const taskList = document.getElementById("taskList");
//            taskList.innerHTML = "";
//            tasks.forEach((taskText) => {
//                const listItem = createTaskElement(taskText);
//                taskList.appendChild(listItem);
//            });
//        }
//
//        // Load tasks from local storage when the page loads
//        loadTasksFromLocalStorage();