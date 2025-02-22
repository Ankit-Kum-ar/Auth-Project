const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie');
const { sendVerificationEmail, sendWelcomeEmail } = require('../mailtrap/emails');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if all fields are entered
        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Please enter all fields'
            });
        }

        // Check the user does not already exist
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a verification token
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit verification code

        // Save the user to the database
        const user = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        });
        
        await user.save();

        // Generate a JWT and set it in a cookie. The token will be used to authenticate the user for future requests.
        generateTokenAndSetCookie(res, user._id);

        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user
        });

    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        });
    }
}

const login = async (req, res) => {
    res.send('Login route');
}

const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid or expired verification code'
            });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            success: true,
            message: 'Email verified successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        });
    }
}

const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
}

module.exports = { signup, login, verifyEmail, logout };