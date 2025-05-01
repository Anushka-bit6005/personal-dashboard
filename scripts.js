// ===== Dark Mode Toggle =====
const modeToggle = document.getElementById("mode-toggle");
const body = document.body;

modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    modeToggle.textContent = body.classList.contains("dark-mode") ? "🌞" : "🌙";
});

// ===== Utility Function to Create List Items =====
function createListItem(text, listElement) {
    const li = document.createElement("li");
    li.textContent = text;

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.onclick = () => li.remove();

    li.appendChild(deleteBtn);
    listElement.appendChild(li);
}

// ===== Add Goal Functionality =====
const addGoalBtn = document.getElementById("add-goal");
const goalInput = document.getElementById("goal-input");
const goalList = document.getElementById("goal-list");

addGoalBtn.addEventListener("click", () => {
    const goal = goalInput.value.trim();
    if (goal) {
        createListItem(goal, goalList);
        goalInput.value = "";
    }
});

// ===== Add Task Functionality =====
const addTaskBtn = document.getElementById("add-task");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

addTaskBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();
    if (task) {
        createListItem(task, taskList);
        taskInput.value = "";
    }
});
// === Quote Generator ===
const quotes = [
    "Success is not in what you have, but who you are. – Bo Bennett",
    "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
    "The secret of getting ahead is getting started. – Mark Twain",
    "Believe you can and you're halfway there. – Theodore Roosevelt",
    "Dream big. Start small. Act now. – Robin Sharma",
    "Your time is limited, so don’t waste it living someone else’s life. – Steve Jobs",
    "Success usually comes to those who are too busy to be looking for it. – Henry David Thoreau"
];

const quoteText = document.getElementById("quote-text");
const newQuoteBtn = document.getElementById("new-quote");

function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteText.textContent = quotes[randomIndex];
}

newQuoteBtn.addEventListener("click", generateQuote);

// Load a quote on page load
window.addEventListener("DOMContentLoaded", generateQuote);

// Save and load from LocalStorage
function saveToStorage(key, listElement) {
    const items = Array.from(listElement.children).map(li => li.childNodes[0].textContent);
    localStorage.setItem(key, JSON.stringify(items));
}

function loadFromStorage(key, listElement) {
    const storedItems = JSON.parse(localStorage.getItem(key)) || [];
    storedItems.forEach(item => createListItem(item, listElement));
}

// Modify your createListItem to auto-save
function createListItem(text, listElement, key = null) {
    const li = document.createElement("li");
    li.textContent = text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.onclick = () => {
        li.remove();
        if (key) saveToStorage(key, listElement);
    };

    li.appendChild(deleteBtn);
    listElement.appendChild(li);
    if (key) saveToStorage(key, listElement);
}

// Update Event Listeners
addGoalBtn.addEventListener("click", () => {
    const goal = goalInput.value.trim();
    if (goal) {
        createListItem(goal, goalList, "goals");
        goalInput.value = "";
    }
});

addTaskBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();
    if (task) {
        createListItem(task, taskList, "tasks");
        taskInput.value = "";
    }
});

// Load saved items on startup
window.addEventListener("DOMContentLoaded", () => {
    generateQuote();
    loadFromStorage("goals", goalList);
    loadFromStorage("tasks", taskList);
});
