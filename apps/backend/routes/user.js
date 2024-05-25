const express = require('express');
const { createUser, loginWithEmail, logout } = require('../controller/user.controller');
const { createTask } = require('../controller/task.controller');

const router = express.Router();

router.post('/', createUser);
router.post('/login', loginWithEmail);
router.post('/logout', logout);

module.exports = router;
