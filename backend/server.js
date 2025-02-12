const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT =  5214;

app.get("/", (req, res) => {
  res.json({ message: "Hello from backend!" });
});
let tasks = [
    { id: 1, title: "Learn React" },
    { id: 2, title: "Build a CRUD app" },
  ];
  
app.get("/tasks", (req, res) => {
res.json(tasks);
});

app.post("/tasks", (req, res) => {
const newTask = { id: Date.now(), title: req.body.title };
tasks.push(newTask);
res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
const taskId = parseInt(req.params.id);
const task = tasks.find(t => t.id === taskId);
if (task) {
    task.title = req.body.title;
    res.json(task);
} else {
    res.status(404).json({ message: "Task not found" });
}
});

app.delete("/tasks/:id", (req, res) => {
const taskId = parseInt(req.params.id);
tasks = tasks.filter(t => t.id !== taskId);
res.status(204).end();
});

app.listen(5214, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
