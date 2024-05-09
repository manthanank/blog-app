const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendEmail } = require('../utils/email');

const generateToken = () => {
    return crypto.randomBytes(20).toString('hex');
};

exports.register = async (req, res) => {
    try {
        const { email, firstName, lastName, password, username } = req.body;

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
            username,
            email,
            firstName,
            lastName,
            password: hashedPassword
        });

        // Save the new user
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true, secure: true });

        res.status(201).json(
            {
                message: 'User created',
                token: token,
                expiresIn: 3600,
                userId: newUser._id,
                username: newUser.username,
                email: newUser.email,
                name: newUser.firstName + ' ' + newUser.lastName
            }
        );
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;

        // Check if email/username and password are provided
        if (!emailOrUsername || !password) {
            return res.status(400).json({ message: 'Email/username and password are required' });
        }

        // Find user by email or username
        const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email/username or password' });
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
                username: user.username,
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

exports.logout = async (req, res) => {
    try {
        res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
        res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getProfileByUsername = async (req, res) => {
    const username = req.params.username;
    try {
        const user = await User.findOne({ username: username }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updateProfileByUsername = async (req, res) => {
    try {
        const { firstName, lastName, email, username } = req.body;
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.username = username;
        await user.save();
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.checkUsernameAvailability = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username });
        if (user) {
            return res.json({ message: 'Username not available' });
        }
        res.json({ message: 'Username available' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.forgotPassword = async (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const token = generateToken();
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();
        const subject = 'Password Reset';
        const endPoint = req.headers.host === 'localhost:3000' ? 'http://localhost:4200' : 'https://blog-app-manthanank.vercel.app/';
        const content = 
        `You are receiving this because you (or someone else) have requested the reset of the password for your account.
        
        Please click on the following link, or paste this into your browser to complete the process:
        
        ${endPoint}/reset-password/${token}/${email}
        
        If you did not request this, please ignore this email and your password will remain unchanged.`;
        sendEmail(email, subject, content);
        res.json({ message: 'Email sent' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.resetPassword = async (req, res) => {
    const { email, token, password } = req.body;
    if (!email || !token || !password) {
        return res.status(400).json({ message: 'Email, token, and password are required' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.resetPasswordToken !== token) {
            return res.status(400).json({ message: 'Invalid token' });
        }
        if (user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({ message: 'Token expired' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.json({ message: 'Password reset' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
