window.onload = function() {
    loadTasks();

    document.getElementById("newBtn").addEventListener("click", function() {
        
        let task = prompt("Enter a new task:");
        
        if (task && task.trim() !== "") {
            addTask(task);
            saveTasks();
        }
    });
};

function addTask(task) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("toDoItem");
    taskElement.textContent = task;

    taskElement.addEventListener("click", function() {
        if (confirm("Do you want to remove this task?")) {
            taskElement.remove();
            saveTasks();
        }
    });

    document.getElementById("todo-list").insertBefore(taskElement, document.getElementById("todo-list").firstChild);
}

function saveTasks() {
    const tasks = [];
    const taskElements = document.querySelectorAll(".toDoItem");
    taskElements.forEach(function(taskElement) {
        tasks.push(taskElement.textContent);
    });
    
    document.cookie = "tasks=" + JSON.stringify(tasks) + "; path=/";
}

function loadTasks() {
    const cookies = document.cookie.split("; ");
    const taskCookie = cookies.find(cookie => cookie.startsWith("tasks="));

    if (taskCookie) {
        const tasks = JSON.parse(taskCookie.split("=")[1]);
        tasks.forEach(function(task) {
            addTask(task);
        });
    }
}
