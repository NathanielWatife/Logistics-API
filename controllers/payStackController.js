const { initializePaystackPayment, verifyPaystackPayment } = require('../utils/paystack');
const { Payment } = require('../models');
const { any, ref } = require('joi');

exports.initializePaystackPayment = async (req, res) => {
    try {
        const { email, amount } = req.body;
        const reference = `PAYSTACK_${Date.now()}`; // unique reference

        // record the payment in the database (pending status)
        await Payment.create({
            email,
            amount,
            reference,
            status: 'pending',
            method: 'paystack',
        });
        const paymentData = await initializePaystackPayment({ email, amount, reference });
        res.json(paymentData);
    } catch (err){
        res.status(500).json({ error: err.message });
    }
};

exports.verifyPaystackPayment = async (req, res) => {
    try {
        const { reference } = req.body;
        const paymentDetails = await verifyPaystackPayment(reference);

        if (paymentDetails.data.status === 'success') {
            // update payment record in the database
            await Payment.update(
                { status: 'verified' },
                { where: { reference } }
            );
            return res.json({ message: 'Payment verified', paymentDetails });
        }
        res.status(400).json({ error: 'Payment not verified' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};