const express = require('express');
const { createVehicle, getVehicle, listVehicles, updateVehicle } = require('../controllers/vehicleController');
const validate = require('../middleware/validate');
const { vehicleSchema } = require('../validations/vehicleValidation');

const router = express.Router();
router.post('/', validate(vehicleSchema), createVehicle);
router.get('/', getVehicle);
router.get('/:id', listVehicles);
router.put('/:id', validate(vehicleSchema), updateVehicle);


module.exports = router;