const Task = require('../models/task');
const { getUser } = require('./user.controller');
const User = require('../models/user');

const taskController = {};

taskController.createTask = async (req, res) => {
  const { task, isCompleted } = req.body;
  const userId = req.userId;
  const newTask = new Task({ task, isCompleted, author: userId });
  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error by saving a new task', err });
  }
};

taskController.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).select('-__v');
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error by getting tasks', err });
  }
};

taskController.getTaskById = async (req, res) => {
  try {
    const id = req.params.taskId;
    const task = await Task.findById(id).select('-__v');
    if (!task) {
      return res.status(404).send('Not existing Task!');
    }
    res.status(200).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error by getting task', err });
  }
};

taskController.getAllTasksByUser = async (req, res) => {
  try {
    const id = req.params.userId;

    const tasks = await Task.find({ author: id }).select('-__v');
    if (!tasks) {
      return res.status(404).send('Not existing Task!');
    }
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error by getting task', err });
  }
};

taskController.editTask = async (req, res) => {
  try {
    const id = req.params.taskId;
    const updatedTask = req.body;
    const result = await Task.findOneAndUpdate({ _id: id }, { $set: updatedTask }, { new: true });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error by editing task', err });
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    const id = req.params.taskId;
    const result = await Task.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Task is not found' });
    }
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error by deleting task', err });
  }
};

module.exports = taskController;
