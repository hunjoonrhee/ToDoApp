const express = require('express');
const { createTask, getTaskById, editTask, deleteTask } = require('../controller/task.controller');
const { authenticate } = require('../controller/auth.controller');

const router = express.Router();

router.get('/:taskId', getTaskById);
router.post('/', authenticate, createTask);
router.put('/:taskId', editTask);
router.delete('/:taskId', deleteTask);

module.exports = router;
