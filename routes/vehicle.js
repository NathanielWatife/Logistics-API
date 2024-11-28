const express = require('express');
const { createVehicle, getVehicle, listVehicles, updateVehicle } = require('../controllers/vehicleController');

const router = express.Router();
router.post('/', createVehicle);
router.get('/', getVehicle);
router.get('/:id', listVehicles);
router.put('/:id', updateVehicle);


module.exports = router;