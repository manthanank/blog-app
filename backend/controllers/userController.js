// const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// simple login function
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
        res.set('Authorization', `Bearer ${token}`);
        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// simple logout function
exports.logout = async (req, res) => {
    try {
        res.set('Authorization', '');
        res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// simple register function
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(200).json({ message: 'Registration successful' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
