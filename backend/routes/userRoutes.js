const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile/:username', userController.getProfileByUsername);
router.get('/profile/:username', userController.updateProfileByUsername);
router.get('/profile/:id', userController.getProfile);
router.put('/profile/:id', userController.updateProfile);
router.get('/check-username/:username', userController.checkUsernameAvailability);
router.post('/forgot-password', userController.forgotPassword);
router.put('/reset-password', userController.resetPassword);

module.exports = router;