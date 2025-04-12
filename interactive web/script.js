// DOM Elements
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Event Listeners
taskForm.addEventListener("submit", addTask);
taskList.addEventListener("click", handleTaskActions);

// Function to Add a New Task
function addTask(event) {
  event.preventDefault();
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    taskItem.innerHTML = `
            <span>${taskText}</span>
            <div class="task-actions">
                <button class="complete-btn">Complete</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
    taskList.appendChild(taskItem);
    taskInput.value = ""; // Clear input field
  }
}

// Function to Handle Task Actions (Complete/Delete)
function handleTaskActions(event) {
  const target = event.target;

  // Complete Task
  if (target.classList.contains("complete-btn")) {
    const taskItem = target.closest(".task-item");
    taskItem.classList.toggle("completed");
  }

  // Delete Task
  if (target.classList.contains("delete-btn")) {
    const taskItem = target.closest(".task-item");
    taskItem.remove();
  }
}



// Function to Handle Task Actions (Complete/Delete)
function handleTaskActions(event) {
    const target = event.target;

    // Complete Task
    if (target.classList.contains('complete-btn')) {
        const taskItem = target.closest('.task-item');
        taskItem.classList.toggle('completed');

        // Add a checkmark icon
        const taskText = taskItem.querySelector('span');
        if (taskItem.classList.contains('completed')) {
            taskText.innerHTML = `✔ ${taskText.textContent}`; // Add checkmark
        } else {
            taskText.innerHTML = taskText.textContent.replace('✔ ', ''); // Remove checkmark
        }
    }

    // Delete Task
    if (target.classList.contains('delete-btn')) {
        const taskItem = target.closest('.task-item');
        taskItem.remove();
    }
}