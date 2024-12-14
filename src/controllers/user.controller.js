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

        // Debug log for incoming request
        console.log('Login request received:', { email, password });

        // Validate request body
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find user by email
        const user = await User.findOne({ email }).exec();
        console.log('User fetched from database:', user);
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Compare password
        const isMatch = await user.comparePassword(password);
        console.log('Password comparison result:', isMatch);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        console.log('Preparing to generate JWT for user:', user._id);
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Token successfully generated:', token);

        // Send successful response
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Server error' });
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