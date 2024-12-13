const express = require('express');
const router =  express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the Logistics API');
})


// group routes
const userRoutes = require('./user.routes');
router.use('/users', userRoutes);


const packageRoutes = require('./package.routes');
router.use('/packages', packageRoutes);

module.exports = router;