const bcrypt = require('bcryptjs');
const crypto = require('crypto');
require('dotenv').config();
const User = require('../models/userModel');
const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie');
const { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } = require('../mailtrap/emails');

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
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                message: 'Please enter all fields'
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'User does not exist'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        // Generate a JWT and set it in a cookie. The token will be used to authenticate the user for future requests.
        generateTokenAndSetCookie(res, user._id);

        await user.save(); // Save the user to update the last login date

        res.status(200).json({ 
            success: true,
            message: 'Logged in successfully',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        });
    }
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

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'User does not exist'
            });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt; 
        await user.save();

        // Send the reset password email
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({
            success: true,
            message: 'Password reset email sent successfully'
        }); 
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        }); 
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid or expired reset token'
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({
            success: true,
            message: 'Password reset successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        });
    }
}

const checkAuth = (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({
            success: true,
            message: 'User authenticated successfully',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error.message}`
        });
    }
}

module.exports = { signup, login, verifyEmail, logout, forgotPassword, resetPassword, checkAuth };