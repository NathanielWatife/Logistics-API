const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createStripePaymentIntent = async ({ amount, currency, description }) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // converts to smallest currency unit
        currency,
        description,
    });
    return paymentIntent.client_secret; // return client secret for client-side information
};

module.exports = { createStripePaymentIntent };