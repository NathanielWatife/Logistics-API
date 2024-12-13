const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// endpoints
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('.profile', userController.getProfile);
router.put('/update', userController.updateProfile);

module.exports = router;