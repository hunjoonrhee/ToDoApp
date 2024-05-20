const Task = require('../models/task');

const taskController = {};

taskController.createTask = async (req, res) => {
  const { task, isCompleted } = req.body;
  const newTask = new Task({ task, isCompleted });
  try {
    await newTask.save();
    res.status(201).json({ message: 'Task is saved', newTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error by saving a new task', err });
  }
};

taskController.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).select('-__v');
    res.status(200).json({ message: 'Tasks are found', tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error by getting tasks', err });
  }
};

module.exports = taskController;
