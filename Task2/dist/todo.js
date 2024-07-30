"use strict";
function addTask() {
    const taskInput = document.querySelector('#task');
    if (taskInput) {
        let task = taskInput.value;
        const li = document.createElement('li');
        li.innerHTML = `<div onclick="editTask(this)">${task}</div><span onclick="removeTask(this)">x</span>`;
        const taskList = document.querySelector("#tasklist");
        taskList === null || taskList === void 0 ? void 0 : taskList.appendChild(li);
        task = '';
    }
}
function removeTask(element) {
    const taskList = document.querySelector("#tasklist");
    if (taskList && element.parentElement)
        taskList === null || taskList === void 0 ? void 0 : taskList.removeChild(element.parentElement);
}
function editTask(element) {
    var _a;
    const li = element.parentElement;
    if (li) {
        let content = ((_a = li.firstChild) === null || _a === void 0 ? void 0 : _a.textContent) || '';
        const edited = prompt("Edit the task", content);
        if (edited !== null)
            li.firstChild.textContent = edited;
    }
}
//# sourceMappingURL=todo.js.map