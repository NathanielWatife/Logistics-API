const { createStripePaymentIntent } = reqiure('../utils/stripe');

exports.initateStripePayment = async (req, res) => {
    try {
        const { amount, currency } = req.body;
        const clientSecret = await createStripePaymentIntent({ amount, currency });
        res.json({ clientSecret });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};