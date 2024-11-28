const express = require('express');
const { createDriver, getDriver, listDriver, updateDriver } = require('../controllers/driverController');

const router = express.Router();

router.post('', createDriver);
router.get('/:id', getDriver);
router.get('/', listDriver);
router.put('/:id', updateDriver);


module.exports = router;