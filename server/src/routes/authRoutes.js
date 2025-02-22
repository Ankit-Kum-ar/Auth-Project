const express = require('express');
const { signup, login, verifyEmail, logout } = require('../controllers/authController');
const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/verify-email', verifyEmail);

module.exports = authRouter;