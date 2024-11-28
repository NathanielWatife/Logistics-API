const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();


exports.register = async (res, req) => {
    try {
        const { name, email, password, phone } = req.body;
        const user = await User.create({ name, email, password, phone});
        res.status(201).json({ message: 'User registered', user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !(await user.validatePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.profile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}