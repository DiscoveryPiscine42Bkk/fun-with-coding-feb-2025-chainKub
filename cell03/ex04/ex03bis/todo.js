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

    document.cookie = "tasks=" + JSON.stringify(tasks) + "; path=/";
}

function loadTasks() {
    const cookies = document.cookie.split("; ");
    const taskCookie = cookies.find(cookie => cookie.startsWith("tasks="));

    if (taskCookie) {
        const tasks = JSON.parse(taskCookie.split("=")[1]);
        tasks.forEach(addTask);
    }
}
