const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        minlength: [3, 'Name must be at least 3 characters'],
        maxlength: [50, 'Name must not be more than 50 characters'], 
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: [true, 'Email already exists'],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email');
            }
        }
    },
    password : {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must be at least 6 characters'],
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error('Password must contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol');
            }
        }
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;