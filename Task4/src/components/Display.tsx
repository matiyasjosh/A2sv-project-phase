import { useState } from "react";

interface Task {
  id: number;
  text: string;
}

function Display() {
  const [tasks, setTasks] = useState<Task[]>(intialTasks);
  const [taskText, setTaskText] = useState<string>("");
  const [editTaskId, setEditTaskId] = useState<number | null>(null);

  function handleAddTask() {
    if (taskText.trim() === "") {
      return;
    }

    if (editTaskId !== null) {
        setTasks(tasks.map(task => task.id === editTaskId ? {...task, text: taskText} : task ));
        setEditTaskId(null); //reset editing state
    } else {
        const newTask: Task = {
          id: nextId++,
          text: taskText,
        };
        setTasks([...tasks, newTask]);
    }
    setTaskText("");
  }

  function handleRemoveTask(idNum:number) {
    setTasks(tasks.filter((t) => t.id != idNum))
  }

  function handleEditTask(task:Task) {
    setEditTaskId(task.id);
    setTaskText(task.text) // perform the edit from the input field
  }

  return (
    <div className="content">
      <h1>To-do</h1>
      <input type="text" id="task" placeholder="Enter a task" value={taskText} onChange={(e) => setTaskText(e.target.value)}/>
      <button onClick={handleAddTask}>{editTaskId === null ? "add" : "edit"}</button>
      <ul id="tasklist">
        {tasks.map((task) => (
            <li key={task.id}><div>{task.text}</div> <div><span onClick={() => handleEditTask(task)}><i className='bx bx-pencil bx-sm'></i></span><span id="del" onClick={() => handleRemoveTask(task.id)}><i className='bx bx-trash bx-sm'></i></span></div></li>
        ))}
      </ul>
    </div>
  );
}

let nextId = 0;
let intialTasks: Task[] = [];

export default Display;
