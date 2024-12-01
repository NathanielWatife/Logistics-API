const { Payment } = require('../models');

exports.recordBankTransfer = async (req, res) => {
    try {
        const { userId, amount, bankDetails } = req.body;
        const payment = await Payment.create({
            user_id: userId,
            amount,
            bank_details: bankDetails,
            reference: `BANK_TRANSFER_${Date.now()}`,
            status: 'pending',
            method: 'bank_transfer',
        });

        res.json({
            message: 'Bank transfer recorded. Awaiting verification.',
            payment
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.verifyBankTransfer = async (req, res) => {
    try {
        const { paymentId } = req.body;

        const payment = await Payment.findByPk(paymentId);
        if (!payment) return res.status(404).json({ error: 'Payment not found' });

        // admin manually verifies the transfer
        await payment.update({ status: 'verified' });

        res.join({ message: 'Payment verified', payment });
    } catch (err){
        res.status(500).json({ error: err.message });
    }
};