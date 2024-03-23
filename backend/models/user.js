const mongoose = require('mongoose');

// user model schema

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure that the username is unique
        trim: true, // Remove whitespace from the beginning and end of the string
        minlength: 3 // Set the minimum length of the username
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure that the email is unique
        trim: true, // Remove whitespace from the beginning and end of the string
        minlength: 3 // Set the minimum length of the email
    },
    firstName: {
        type: String,
        required: true,
        minlength: 3 // Set the minimum length of the first name
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3 // Set the minimum length of the last name
    },
    password: {
        type: String,
        required: true,
        minlength: 5 // Set the minimum length of the password
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

const User = mongoose.model('User', userSchema);

module.exports = User;