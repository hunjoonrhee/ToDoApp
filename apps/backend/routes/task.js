const express = require('express');
const { createTask, getTaskById, editTask } = require('../controller/task.controller');

const router = express.Router();

router.get('/:taskId', getTaskById);
router.post('/', createTask);
router.put('/:taskId', editTask)

module.exports = router;
