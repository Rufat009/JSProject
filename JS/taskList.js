import Task from "./task.js";

class TasksList {
    #tasks = [];

    constructor(){

       
        const objects = JSON.parse(localStorage.getItem("tasks"));
        
        if(objects === null){
            return
        }
        
        this.setTasks = objects.map(obj => Task.getObjectToTask(obj));
        
    } 

    set setTasks(tasks){
        this.#tasks = [...tasks];
    }
    
    get getAllTasks() { return [...this.#tasks]; }
    static getDoneTasks(tasks) { return tasks.filter(task => task.getIsCompleted); }
    static getRemaindedTasks(tasks) { return tasks.filter(task => !task.getIsCompleted); }

    static getTasksByName(tasks) { return tasks.sort((a, b) => a.getName > b.getName ? 1 : a.getName < b.getName ? -1 : 0); }
    static getTasksByDates(tasks) { return tasks.sort((a, b) => b.compareDates(a)); }

    addTask(newTask){
        this.#tasks.push(newTask);
        const tasksList = document.getElementById("tasks-list");
        tasksList.appendChild(this.createTaskElement(newTask));
        this.updateLocalStorage();
    }
    deleteTask(id){
        this.#tasks = this.#tasks.filter(task => task.getId !== id);
        this.updateLocalStorage();
    }
    editTask(id, editedTask) {
        let taskToChange = this.#tasks.find(task => task.getId === id);
        if(taskToChange === undefined) return;
        taskToChange.setName = editedTask.getName;
        taskToChange.setDescription = editedTask.getDescription;
        taskToChange.setIsCompleted = editedTask.getIsCompleted;
        this.updateLocalStorage();
        this.updateFrontEnd();
    }

    createTaskElement(task) {

        const taskElement = document.createElement("div");
        taskElement.classList += "task-element"
       
        const taskName = document.createElement("h3");
        taskName.textContent = `Name: ${task.getName}`;
        taskName.classList.add("taskName");
        
        const deleteTaskButton = document.createElement("button");
        deleteTaskButton.textContent = "Delete";
        deleteTaskButton.classList.add("delete-task-btn");
        
        const editTaskButton = document.createElement("button");
        editTaskButton.textContent = "Edit";
        editTaskButton.classList.add("edit-task-btn");
        
        const detailsTaskButton = document.createElement("button");
        detailsTaskButton.textContent = "Details";
        detailsTaskButton.classList.add("details-task-btn");
        
        const lineBreak = document.createElement("br");
        
        const statusLabel = document.createElement("label");
        statusLabel.textContent = "Change Status:";
        statusLabel.setAttribute("for", `${task.getId}-status`);
        
        const statusSelect = document.createElement("select");
        statusSelect.id = `${task.getId}-status`;
        
        const notCompletedOption = document.createElement("option");
        notCompletedOption.value = "not-completed";
        notCompletedOption.textContent = "Not Completed";
        if (!task.getIsCompleted) {
        notCompletedOption.selected = true;
    }
    
    const completedOption = document.createElement("option");
    completedOption.value = "completed";
    completedOption.textContent = "Completed";
    if (task.getIsCompleted) {
        completedOption.selected = true;
    }
    
    taskElement.appendChild(taskName);
    taskElement.appendChild(deleteTaskButton);
    taskElement.appendChild(editTaskButton);
    taskElement.appendChild(detailsTaskButton);
    taskElement.appendChild(lineBreak);
    taskElement.appendChild(statusLabel);
    statusSelect.appendChild(notCompletedOption);
    statusSelect.appendChild(completedOption);
    taskElement.appendChild(statusSelect);
    
    document.body.appendChild(taskElement);
    
    
    const deleteButton = taskElement.querySelector(".delete-task-btn");
    const editButton = taskElement.querySelector(".edit-task-btn");
    const detailsButton = taskElement.querySelector(".details-task-btn");
    const isCompletedSelect = taskElement.querySelector(`#${task.getId}-status`);

        deleteButton.addEventListener("click", () => {
            this.deleteTask(task.getId);
            taskElement.remove();
        });

        editButton.addEventListener("click", () => {
            window.location.href = `../HTML/edit.html?id=${task.getId}`;
        });

        detailsButton.addEventListener("click", () => {
            window.location.href = `../HTML/details.html?id=${task.getId}`;
        }); 

        isCompletedSelect.addEventListener("change", () => {
            const newStatus = isCompletedSelect.value === "completed";
            task.setIsCompleted = newStatus;
            this.updateLocalStorage();
        });
        
        return taskElement;
    }

    updateFrontEnd(tasks = this.#tasks){
        const tasksList = document.getElementById("tasks-list");
        tasksList.innerHTML = "";
        tasks.forEach(task => {
            tasksList.appendChild(this.createTaskElement(task));
        });
    }

    updateSortFilter(filterValue, sortValue) {    
        let tempTasks = this.getAllTasks;
    
        if (filterValue === "completed") { tempTasks = TasksList.getDoneTasks(tempTasks); } 
        else if (filterValue === "not-completed") { tempTasks = TasksList.getRemaindedTasks(tempTasks); }
    
        if (sortValue === "date") { tempTasks = TasksList.getTasksByDates(tempTasks); } 
        else if (sortValue === "name") { tempTasks = TasksList.getTasksByName(tempTasks); }
    
        this.updateFrontEnd(tempTasks);
    }

    updateLocalStorage(){
        const temp = [];
        this.#tasks.forEach(task => temp.push(task.getTaskToObject));
        localStorage.setItem("tasks", JSON.stringify(temp));
    }
}

export default TasksList;