// implement user in controller
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// register new user
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // check if user exists
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({
            error: 'User Email already exists'
        });

        // create new users
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered Successfully', userId: newUser._id });
    } catch(err){
        res.status(500).json({ error: 'Server error' });
    }
};

// login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const isMatch = await user.comparePassword(password);
        if (isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        // generate jwt token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({  error: 'Server error' });
    }
};

// get user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-pasword');
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// update user profile
exports.updateProfile = async (req, res) => {
    try {
        const { name } = req.body;
        const user = await User.findByIdAndUpdate(req.user.userId, {name}, {new: true}).select('-pasword');
        if (!user) return res.status(404).json({error: 'User not found'});
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({error: 'Server error'});
    }
};