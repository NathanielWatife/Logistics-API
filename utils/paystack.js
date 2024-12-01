const axios = require('axios');
require('dotenv').config();

const paystack = axios.create({
    baseURL: 'https://api.paystack.co',
    headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    },
});

const initializePaystackPayment = async ({ email, amount, reference }) => {
    const response = await paystack.post('/transaction/initialize', {
        email,
        amount: amount * 100, // convert to kobi
        currency: 'NGN',
        reference
    });
    return response.data; // return payment link and transaction reference
};

const verifyPaystackPayment = async (reference) => {
    const response = await paystack.get(`/transaction/verify/${reference}`);
    return response.data; // return payment status and details
};

module.exports = { initializePaystackPayment, verifyPaystackPayment };