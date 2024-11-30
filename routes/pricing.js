const express = require('express');
const calculatePrice = require('../utils/pricing');
const router = express.Router();

router.post('/estimate', (req, res) => {
    try {
        const { weight, distance, transitType } = req.body;

        if (!weight || !distance || !transitType) {
            return res.status(400).json({ error: 'Weight, distance, and transitType are required' });
        }
        const price = calculatePrice({ weight, distance, transitType });
        res.json({ price });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


module.exports = router;