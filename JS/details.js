import Task from "./task.js";

const Home = document.getElementById("Home");

Home.addEventListener("click", e => {
    window.location.href = '../HTML/index.html';
})

const myParams = new URLSearchParams(window.location.search);
const myObjects = JSON.parse(localStorage.getItem("tasks"));
const myTask = Task.getObjectToTask(myObjects.find(task => task.id === myParams.get('id')));
const myDetails = document.createElement("div");

const title = document.createElement("h1");
title.textContent = "Details";
myDetails.appendChild(title);

const nameHeader = document.createElement("h2");
nameHeader.textContent = "Name:";
const name = document.createElement("p");
name.textContent = myTask.getName;

const idHeader = document.createElement("h3");
idHeader.textContent = "Id:";
const id = document.createElement("p");
id.textContent = myTask.getId;

const desc = document.createElement("p");
desc.textContent = `Desc: ${myTask.getDescription}`;

const status = document.createElement("p");
status.textContent = `Status: ${myTask.getIsCompleted ? "Completed" : "Not Completed"}`;

const creationDate = document.createElement("p");
creationDate.textContent = `Creation Date: ${myTask.getCreationDate}`;

myDetails.appendChild(nameHeader);
myDetails.appendChild(name);
myDetails.appendChild(idHeader);
myDetails.appendChild(id);
myDetails.appendChild(desc);
myDetails.appendChild(status);
myDetails.appendChild(creationDate);

document.body.appendChild(myDetails);


const detaildDiv = document.getElementById("details");
detaildDiv.innerHTML = "";
detaildDiv.appendChild(myDetails);

