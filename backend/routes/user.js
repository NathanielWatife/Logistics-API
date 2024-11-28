const express = require('express');
const { register, login, profile } = require('../controllers/uerController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', profile, authenticate);


module.exports = router;