function saveChanges() {
    var taskList = document.getElementById('taskList');
    var tasks = [];
    var taskElements = taskList.getElementsByTagName('li');
    for (var i = 0; i < taskElements.length; i++) {
        var taskText = taskElements[i].getElementsByClassName('task')[0].textContent;
        var isCompleted = taskElements[i].getElementsByClassName('task')[0].classList.contains('completed');
        tasks.push({ content: taskText, completed: isCompleted });
    }
    fetch('/save_tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tasks),
    }).then(function(response) {
        if (response.ok) {
            alert('Tasks saved successfully');
        } else {
            alert('Failed to save tasks');
        }
    });
}


























































































//const openModal = document.getElementById('openModal');
//const inputBox = document.getElementById('taskInput');
//const taskList = document.getElementById('taskList');
//const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
//
//openModal.addEventListener('click', function () {
//});
//
//function createTaskElement(task) {
//    const listItem = document.createElement("li");
//    listItem.textContent = task.content;
//
//    if (task.completed) {
//        listItem.classList.add("completed");
//    }
//
//    const closeBtn = document.createElement("span");
//    closeBtn.textContent = "\u00D7";
//    closeBtn.className = "close";
//
//    closeBtn.addEventListener("click", function () {
//        deleteTask(task.id, listItem);
//    });
//
//    listItem.appendChild(closeBtn);
//
//    return listItem;
//}
//
//function addTask() {
//    const taskText = inputBox.value.trim();
//    if (taskText === '') {
//        alert('You must write something!');
//    } else {
//        fetch('/add_task', {
//            method: 'POST',
//            headers: {
//                'Content-Type': 'application/json',
//            },
//            body: JSON.stringify({ content: taskText }),
//        })
//        .then(response => response.json())
//        .then(data => {
//            if (data.success) {
//                // Create a new list item and add it to the taskList
//                const newTask = { content: taskText, completed: false };
//                const listItem = createTaskElement(newTask);
//                listItem.setAttribute('data-task-id', data.task_id); // Assuming 'task_id' is returned by the API
//                taskList.appendChild(listItem);
//
//                // Clear the input box
//                inputBox.value = '';
//            } else {
//                alert('Failed to add task');
//            }
//        })
//        .catch(error => {
//            console.error('Error:', error);
//        });
//    }
//}
//
//
//function loadTask() {
//    fetch('/get_tasks')
//        .then(response => response.json())
//        .then(data => {
//            taskList.innerHTML = '';
//            data.forEach(task => {
//                const listItem = createTaskElement(task);
//                listItem.setAttribute('data-task-id', task.id);
//                taskList.appendChild(listItem);
//            });
//        })
//        .catch(error => {
//            console.error('Error:', error);
//        });
//}
//
//function deleteTask(taskId, listItem) {
//    fetch(`/delete_task/${taskId}`, {
//        method: 'DELETE'
//    })
//    .then(response => response.json())
//    .then(data => {
//        if (data.success) {
//            listItem.remove();
//        } else {
//            alert('Failed to delete task');
//        }
//    })
//    .catch(error => {
//        console.error('Error:', error);
//    });
//}
//
//
//
//
//
//
//////save data to local storage
////function saveData(){
////    localStorage.setItem('data', taskList.innerHTML);
////}
////
//////
////function loadTask(){
////    taskList.innerHTML = localStorage.getItem('data');
////}
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
////        // Function to add a task to the list
////        function addTask() {
////            const taskInput = document.getElementById("taskInput");
////            const taskList = document.getElementById("taskList");
////            const taskText = taskInput.value.trim();
////
////            if (taskText !== "") {
////                const listItem = createTaskElement(taskText);
////
////                // Create a close button for the task
////                const closeBtn = document.createElement("span");
////                closeBtn.textContent = "\u00D7";
////                closeBtn.className = "close";
////                closeBtn.addEventListener("click", function () {
////                    listItem.remove();
////                });
////
////                // Append the close button to the task
////                listItem.appendChild(closeBtn);
////
////                taskList.appendChild(listItem);
////                taskInput.value = "";
////            }
////        }
////
////
////        // Event listener to add a task when the "Add" button is clicked
////        document.querySelector(".addBtn").addEventListener("click", addTask);
////
////        // Function to save tasks to local storage
////        function saveTasksToLocalStorage() {
////            const taskList = document.getElementById("taskList");
////            const tasks = [];
////
////            // Get all task text from list items
////            taskList.querySelectorAll("li").forEach((li) => {
////                tasks.push(li.textContent);
////            });
////
////            // Store tasks in local storage as a JSON string
////            localStorage.setItem("tasks", JSON.stringify(tasks));
////        }
////
////        // Event listener to save tasks when the "Save Changes" button is clicked
////        document.getElementById("saveToLocalStorage").addEventListener("click", saveTasksToLocalStorage);
////
////        // Function to load tasks from local storage
////        function loadTasksFromLocalStorage() {
////            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
////
////            // Populate the task list with the loaded tasks
////            const taskList = document.getElementById("taskList");
////            taskList.innerHTML = "";
////            tasks.forEach((taskText) => {
////                const listItem = createTaskElement(taskText);
////                taskList.appendChild(listItem);
////            });
////        }
////
////        // Load tasks from local storage when the page loads
////        loadTasksFromLocalStorage();