const express = require('express');
const { createDriver, getDriver, listDrivers, updateDriver } = require('../controllers/driverController');
const validate = require('../middleware/validate');
const { driverSchema } = require('../validations/driverValidation');

const router = express.Router();

router.post('/', validate(driverSchema), createDriver); // Create a driver
router.get('/:id', getDriver);  // Get a specific driver by ID
router.get('/', listDrivers);  // List all drivers
router.put('/:id', validate(driverSchema), updateDriver); // Update a driver

module.exports = router;
