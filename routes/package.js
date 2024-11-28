const express = require('express');
const { createPackage, getPackage, listPackage, updatePackage } = require('../controllers/packageController');
const { route } = require('./user');
const router = express.Router();


router.post('/', createPackage);
router.get('/', getPackage);
router.get('/', listPackage);
router.put('/', updatePackage);

module.exports = router;