import Task from "./Models/task.js";
import tasks from "./globals.js";

const filter = document.getElementById("filter");
const sort = document.getElementById("sort");

const addTaskForm = document.getElementById("form");
const taskName = document.getElementById("name");
const taskDescription = document.getElementById("description");

addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let taskToAdd;
        taskToAdd = new Task(taskName.value, taskDescription.value);

        taskName.value = " ";
        taskDescription.value = " ";


    tasks.addTask(taskToAdd);
});

filter.addEventListener("change", () => { tasks.updateSortFilter(filter.value, sort.value) })
sort.addEventListener("change", () => { tasks.updateSortFilter(filter.value, sort.value) })

tasks.updateFrontEnd(); 
console.log(tasks);