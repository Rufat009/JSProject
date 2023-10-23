import Task from "../Models/task.js";

const goHomeButton = document.getElementById("go-home-btn");

goHomeButton.addEventListener("click", e => {
    window.location.href = '/index.html';
})

const urlParams = new URLSearchParams(window.location.search);
const tasksObjects = JSON.parse(localStorage.getItem("tasks"));
const currTask = Task.getObjectToTask(tasksObjects.find(task => task.id === urlParams.get('id')));

const taskDetails = document.createElement("div");
taskDetails.innerHTML = `
                    <h1>Details:</h1>
                    <h2>Name: ${currTask.getName}</h2>
                    <h3>Id: ${currTask.getId}</h3>   
                    <p>Desc: ${currTask.getDescription}</p>
                    <p>Status: ${currTask.getIsCompleted ? "Completed" : "Not Completed"}</p>                  
                    <p>Creation Date: ${currTask.getCreationDate}</p>                
                    `;

const detaildDiv = document.getElementById("details");
detaildDiv.innerHTML = "";
detaildDiv.appendChild(taskDetails);

