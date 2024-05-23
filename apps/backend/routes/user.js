const express = require('express');
const { createUser, loginWithEmail } = require('../controller/user.controller');
const { createTask } = require('../controller/task.controller');

const router = express.Router();

router.post('/', createUser);
router.post('/login', loginWithEmail);

module.exports = router;
