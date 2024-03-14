const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile/:id', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.post('/forgot-password', userController.forgotPassword);
router.put('/reset-password', userController.resetPassword);

module.exports = router;