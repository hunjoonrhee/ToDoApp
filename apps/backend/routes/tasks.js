const express = require('express');
const { getAllTasks, getAllTasksByUser } = require('../controller/task.controller');

const router = express.Router();

router.get('/', getAllTasks);
router.get('/:userId', getAllTasksByUser);

module.exports = router;
