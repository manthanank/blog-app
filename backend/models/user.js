// user model schema
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // replace username with email
    email : {
        type: String,
        required: true,
        unique: true, // Ensure that the email is unique
        trim: true, // Remove whitespace from the beginning and end of the string
        minlength: 3 // Set the minimum length of the email
    },
    password: {
        type: String,
        required: true,
        minlength: 5 // Set the minimum length of the password
    }
    });

const User = mongoose.model('User', userSchema);

module.exports = User;