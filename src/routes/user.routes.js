const express = require('express');
const router = express.Router();

// endpoints
router.post('/register', (req, res) => {
    res.send('User registration endpoint');
});

router.post('/login', (req, res) => {
    res.send('User login endpoint');
});

router.get('.profile', (res, req) => {
    res.send('User profile endpoint');
});

module.exports = router;