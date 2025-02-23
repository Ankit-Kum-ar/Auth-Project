const express = require('express');
const { signup, login, verifyEmail, logout, forgotPassword, resetPassword, checkAuth } = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware');
const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/verify-email', verifyEmail);
authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/reset-password/:token', resetPassword);
authRouter.get('/check-auth', verifyToken, checkAuth);

module.exports = authRouter;