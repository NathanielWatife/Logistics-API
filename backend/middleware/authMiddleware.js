const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();


exports.authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'Unauthorized' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findByPk(decoded.id);
        if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
        next();
    } catch (err) {
        res.status(401).json({ error: 'Unauthorized' });        
    };
}