const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true },
        weight: { type: Number, required: true, min: 0.1 },
        quantity: { type: Number, required:true, min: 1 },
        transitType: {
            type: String,
            required: true,
            enum: ['Bike', 'Car', 'Van', 'Mini Van']
        },
        price: { type: Number, required: true },
    },
    { timestamp: true }
);

module.exports = mongoose.model('Package', packageSchema);