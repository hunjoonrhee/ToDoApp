const express = require('express');
const { createTask } = require('../controller/task.controller');

const router = express.Router();

router.get('/:taskId', (req, res) => {
  res.send('selected Task');
});
router.post('/', createTask);

module.exports = router;
