import Task from "./task.js";
import tasks from "./globals.js";

const goHomeButton = document.getElementById("go-home-btn");

goHomeButton.addEventListener("click", e => {
    window.location.href = '/index.html';
})

const myTask = Task.getObjectToTask(myObjects.find(task => task.id === myParams.get('id')));
const myObjects = JSON.parse(localStorage.getItem("tasks"));

const Form = document.getElementById("form");
const myParams = new URLSearchParams(window.location.search);
const Name = document.getElementById('name');
const Description = document.getElementById('description');
const Status = document.getElementById('status');

Form.addEventListener("submit", (e) => {
    e.preventDefault();
    myTask.setName = Name.value; 
      myTask.setDescription = Description.value; 
      myTask.setIsCompleted = Status.checked;
    console.log(Status.checked);

    tasks.editTask(myTask.getId, myTask);
});