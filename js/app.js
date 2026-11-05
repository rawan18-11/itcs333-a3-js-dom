// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

document.addEventListener("DOMContentLoaded", function () {
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const errorMsg = document.getElementById("error-msg");
const counter = document.getElementById("counter");
const todoForm = document.getElementById("todo-form");

const filterAll = document.getElementById("filter-all");
const filterActive = document.getElementById("filter-active");
const filterDone = document.getElementById("filter-done");

let currentFilter = "all";
function updateCounter() {
    const remaining = todoList.querySelectorAll("li:not(.completed)").length;
    counter.textContent = remaining + " item(s) left";
}

function applyFilter() {
    const items = todoList.querySelectorAll("li");

    items.forEach(function(item) {
        const completed = item.classList.contains("completed");

        if (currentFilter === "all") {
            item.style.display = "";
        } else if (currentFilter === "active") {
            item.style.display = completed ? "none" : "";
        } else if (currentFilter === "done") {
            item.style.display = completed ? "" : "none";
        }
    });
}

function addItem() {
    const text = input.value.trim();

    if (text === "") {
    errorMsg.classList.remove("hidden");
    return;
}

errorMsg.classList.add("hidden");
const li = document.createElement("li");

const span = document.createElement("span");
span.textContent = text;

const deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";
deleteBtn.classList.add("delete-btn");

li.appendChild(span);
li.appendChild(deleteBtn);

todoList.appendChild(li);
   
    input.value = "";
    updateCounter();
    applyFilter();
}


todoForm.addEventListener("submit", function(event) {
    event.preventDefault();
  
    addItem();
});
todoList.addEventListener("click", function(event) {
    const li = event.target.closest("li");

    if (!li) {
        return;
    }
if (event.target.closest(".delete-btn")) {
    li.remove();
} else {
    li.classList.toggle("completed");
}

updateCounter();
applyFilter();
    
});
filterAll.addEventListener("click", function() {
    currentFilter = "all";
    applyFilter();
});

filterActive.addEventListener("click", function() {
    currentFilter = "active";
    applyFilter();
});

filterDone.addEventListener("click", function() {
    currentFilter = "done";
    applyFilter();
});

});
