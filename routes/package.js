const express = require('express');
const { createPackage, getPackage, listPackages, updatePackage } = require('../controllers/packageController');
const router = express.Router();


router.post('/', createPackage);
router.get('/:id', getPackage);
router.get('/', listPackages);
router.put('/:id', updatePackage);

module.exports = router;