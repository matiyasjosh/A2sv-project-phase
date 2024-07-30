function addTask(): void {
    const taskInput = document.querySelector('#task') as HTMLInputElement;

    if (taskInput) {
        let task: string = taskInput.value;
        const li = document.createElement('li');
        li.innerHTML = `<div onclick="editTask(this)">${task}</div><span onclick="removeTask(this)">x</span>`

        const taskList = document.querySelector("#tasklist");
        taskList?.appendChild(li);
        task = '';
    }
}


function removeTask(element: HTMLElement): void {
    const taskList = document.querySelector("#tasklist");
    
    if (taskList && element.parentElement)
        taskList?.removeChild(element.parentElement)
}

function editTask(element: HTMLElement): void {
    const li = element.parentElement;
    if (li) {
        let content = li.firstChild?.textContent || '';
        const edited = prompt("Edit the task", content);
        
        if (edited !== null)
            li.firstChild!.textContent = edited; 
    }   
}