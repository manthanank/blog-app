const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/users', userController.getUsers);
router.get('/profile/:username', userController.getProfileByUsername);
router.put('/profile/:username', userController.updateProfileByUsername);
router.get('/check-username/:username', userController.checkUsernameAvailability);
router.post('/forgot-password', userController.forgotPassword);
router.put('/reset-password', userController.resetPassword);

module.exports = router;
