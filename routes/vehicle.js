const express = require('express');
const { createVehicle, getVehicle, listVehicle, updateVehicle } = require('../controllers/vehicleController');

const router = express.Router();
router.post('/', createVehicle);
router.get('/', getVehicle);
router.get('/:id', listVehicle);
router.put('/:id', updateVehicle);


module.exports = router;