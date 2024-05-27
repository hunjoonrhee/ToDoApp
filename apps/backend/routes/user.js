const express = require('express');
const { createUser, loginWithEmail, logout, getUser } = require('../controller/user.controller');
const { authenticate } = require('../controller/auth.controller');

const router = express.Router();

router.post('/', createUser);
router.post('/login', loginWithEmail);
router.post('/logout', logout);
router.get('/me', authenticate, getUser);

module.exports = router;
