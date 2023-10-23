class Task{
    #id;
    #name;
    #description;
    #creationDate;
    #isCompleted;

    constructor(name, description){
        this.#id = this.generateId();
        this.#creationDate = new Date();
        this.#isCompleted = false;
        this.setName = name;
        this.setDescription = description;
    }


    get getTaskToObject() {
        return {
            id: this.#id,
            name: this.#name,
            description: this.#description,
            creationDate: this.#creationDate,
            isCompleted: this.#isCompleted
        }
    }

    get getId() { return this.#id; }
    get getName() { return this.#name; }
    get getDescription() { return this.#description; }
    get getIsCompleted() { return this.#isCompleted; }
    get getCreationDate() {
        const temp = new Date(this.#creationDate);
        return  temp.getDate() + ":" + temp.getMonth() + ":" + temp.getFullYear() + 
        " " + temp.getHours() + ":" + temp.getMinutes() + ":" + temp.getSeconds(); 
    }


    static getObjectToTask(obj) {
        let task = new Task(obj.name, obj.description);
        task.#setId = obj.id;
        task.setIsCompleted = obj.isCompleted;
        task.#setCreationDate = obj.creationDate;
        return task;
    }


    set setDescription(description){
        this.#description = description;
    }

    set setName(name){
        this.#name = name;
    }
    compareDates(taskToCompare) {
        
        if (this.#creationDate > taskToCompare.#creationDate) return 1;
        else if (this.#creationDate < taskToCompare.#creationDate) return -1;
        return 0;
    }

    changeIsCompleted(){
        this.#isCompleted = !this.#isCompleted;
    }

    set setIsCompleted(isCompleted) { this.#isCompleted = isCompleted; }
    set #setId(id) { this.#id = id; }
    set #setCreationDate(date) { this.#creationDate = date; }



    
}

function generateId() { 
    return "id" + Date.now().toString(16) + Math.random().toString(16).substr(2);
}

export default Task;