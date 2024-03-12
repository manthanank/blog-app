const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// simple login function
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true, secure: true });

        res.status(200).json(
            {
                message: 'Login successful',
                token: token,
                expiresIn: 3600,
                userId: user._id,
                name: user.firstName + ' ' + user.lastName,
                email: user.email
            }
        );
    } catch (err) {
        // Handle unexpected errors
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// simple logout function
exports.logout = async (req, res) => {
    try {
        res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
        res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// simple register function
exports.register = async (req, res) => {
    try {
        const { email, firstName, lastName, password } = req.body;

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            email,
            firstName,
            lastName,
            password: hashedPassword
        });

        // Save the new user
        await newUser.save();

        res.status(200).json({ message: 'Registration successful' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// simple get profile function
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// simple update profile function
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        await user.save();
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}