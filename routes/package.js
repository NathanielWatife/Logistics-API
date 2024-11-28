const express = require('express');
const { createPackage, getPackage, listPackages, updatePackage } = require('../controllers/packageController');
const validate = require('../middleware/validate');
const { packageSchema } = require('../validations/packageValidation');
const router = express.Router();


router.post('/', validate(packageSchema), createPackage);
router.get('/:id', getPackage);
router.get('/', listPackages);
router.put('/:id', validate(packageSchema), updatePackage);

module.exports = router;