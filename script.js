let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

let filteredTasks = tasks.filter(task => {
    if (currentFilter === "completed") return task.done;
    if (currentFilter === "pending") return !task.done;
    return true;
});

filteredTasks.forEach((task, index) => {
    function filterTasks(type) {
    currentFilter = type;
    renderTasks();
}});

function filterTasks(type) {
    currentFilter = type;

    // Remove active from all buttons
    document.querySelectorAll(".filter-buttons button")
        .forEach(btn => btn.classList.remove("active"));

    // Add active to clicked button
    event.target.classList.add("active");

    renderTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {

        // Apply filter condition
        if (currentFilter === "completed" && !task.done) return;
        if (currentFilter === "pending" && task.done) return;

        let li = document.createElement("li");

        li.innerHTML = `
            <div style="display:flex; align-items:center; gap:10px;">
                <input type="checkbox"
                    ${task.done ? "checked" : ""} 
                    onchange="toggleTask(${index})">

                <div>
                    <span class="${task.done ? 'completed' : ''}">
                        ${task.text}
                    </span>
                    <br>
                    <small>${task.date ? "Due: " + task.date : ""}</small>
                </div>
            </div>

            <div>
                <button onclick="editTask(${index})">✏️</button>
                <button onclick="deleteTask(${index})">❌</button>
            </div>
        `;

        list.appendChild(li);
    });
}

function addTask() {
    let input = document.getElementById("taskInput");
    let dateInput = document.getElementById("dueDate");

    let text = input.value.trim();
    let date = dateInput.value;

    // Prevent empty task
    if (text === "") {
        alert("Task cannot be empty!");
        return;
    }

    // Add task object
    tasks.push({
        text: text,
        done: false,
        date: date
    });

    // Clear inputs
    input.value = "";
    dateInput.value = "";

    // Save + re-render
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function editTask(index) {
    let newText = prompt("Edit your task:", tasks[index].text);

    if (newText !== null && newText !== "") {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
    }
}

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        addTask();
    }
}

function toggleTheme() {
    document.body.classList.toggle("light");
}

renderTasks();