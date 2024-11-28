const express = require('express');
const { createDriver, getDriver, listDrivers, updateDriver } = require('../controllers/driverController');

const router = express.Router();

router.post('/', createDriver); // Create a driver
router.get('/:id', getDriver);  // Get a specific driver by ID
router.get('/', listDrivers);  // List all drivers
router.put('/:id', updateDriver); // Update a driver

module.exports = router;
