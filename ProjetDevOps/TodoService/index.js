const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// Dossier contenant index.html
app.use(express.static(path.join(__dirname, 'frontend')));

// API routes
let tasks = [];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const task = { id: tasks.length + 1, title: req.body.title, done: false };
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) return res.sendStatus(404);
  task.done = true;
  res.json(task);
});


app.listen(3000, () => console.log('Todo service running on port 3000'));
