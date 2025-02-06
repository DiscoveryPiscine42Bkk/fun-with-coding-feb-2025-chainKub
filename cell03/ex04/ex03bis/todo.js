$(document).ready(function() {
    loadTasks(); 

    $("#newBtn").click(function() {
        let task = prompt("Enter a new task:");
        if (task && task.trim() !== "") {
            addTask(task); 
            saveTasks(); 
        }
    });
});

function addTask(task) {
    const taskElement = $("<div>").addClass("toDoItem").text(task);

    taskElement.click(function() {
        if (confirm("Do you want to remove this task?")) {
            $(this).remove(); 
            saveTasks();     
        }
    });

    $("#todo-list").prepend(taskElement);
}

function saveTasks() {
    const tasks = $(".toDoItem").map(function() {
        return $(this).text();
    }).get();

    const encodedTasks = encodeURIComponent(JSON.stringify(tasks));

    try {
        document.cookie = "tasks=" + encodedTasks + "; path=/"; 
    } catch (e) {
        console.error("Failed to save tasks in cookie:", e);
    }
}

function loadTasks() {
    const cookies = document.cookie.split("; ");
    const taskCookie = cookies.find(cookie => cookie.startsWith("tasks="));

    if (taskCookie) {
        try {
            const tasks = JSON.parse(decodeURIComponent(taskCookie.split("=")[1]));
            
            tasks.reverse().forEach(function(task) {
                addTask(task); 
            });
        } catch (e) {
            console.error("Failed to parse tasks from cookie:", e);
        }
    }
}
