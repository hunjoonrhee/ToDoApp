const express = require('express');
const { getAllTasks } = require('../controller/task.controller');

const router = express.Router();

router.get('/', getAllTasks);

module.exports = router;
