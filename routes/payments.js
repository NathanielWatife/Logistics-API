const express = require('express');
const {
  initiatePaystackPayment,
  verifyPaystackPayment,
} = require('../controllers/paystackController');
const {
  recordBankTransfer,
  verifyBankTransfer,
} = require('../controllers/bankTransferController');
const { initiateStripePayment } = require('../controllers/stripeController');

const router = express.Router();

router.post('/paystack/initiate', initiatePaystackPayment);
router.post('/paystack/verify', verifyPaystackPayment);
router.post('/bank-transfer', recordBankTransfer);
router.post('/bank-transfer/verify', verifyBankTransfer);
router.post('/stripe/initiate', initiateStripePayment);

module.exports = router;
