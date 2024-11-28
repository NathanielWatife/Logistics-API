const express = require('express');
const { register, login, profile } = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { userSchema } = require('../validations/userValidation');

const router = express.Router();
router.post('/register', validate(userSchema), register);
router.post('/login', login);
router.get('/profile', profile, authenticate);


module.exports = router;