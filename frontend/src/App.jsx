import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);

  // Fetch tasks
  useEffect(() => {
    axios.get("http://localhost:5214/tasks")
      .then(response => setTasks(response.data))
      .catch(error => console.error("Error fetching tasks:", error));
  }, [tasks]);

  // Create task
  const handleAddTask = () => {
    axios.post("http://localhost:5214/tasks", { title: newTask })
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTask("");
      })
      .catch(error => console.error("Error adding task:", error));
  };

  // Edit task
  const handleEditTask = (id) => {
    setEditTaskId(id);
    const taskToEdit = tasks.find(t => t.id === id);
    setEditTask(taskToEdit.title);
  };

  const handleUpdateTask = () => {
    axios.put(`http://localhost:5214/tasks/${editTaskId}`, { title: editTask })
      .then(response => {
        setTasks(tasks.map(task => task.id === editTaskId ? response.data : task));
        setEditTask("");
        setEditTaskId(null);
      })
      .catch(error => console.error("Error updating task:", error));
  };

  // Delete task
  const handleDeleteTask = (id) => {
    axios.delete(`http://localhost:5214/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => console.error("Error deleting task:", error));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Vite + Express CRUD App</h1>

      <div>
        <h3>Add New Task</h3>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div>
        <h3>Edit Task</h3>
        {editTaskId && (
          <>
            <input
              type="text"
              value={editTask}
              onChange={(e) => setEditTask(e.target.value)}
            />
            <button onClick={handleUpdateTask}>Update Task</button>
          </>
        )}
      </div>

      <div>
        <h3>Tasks List</h3>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.title}
              <button onClick={() => handleEditTask(task.id)}>Edit</button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
