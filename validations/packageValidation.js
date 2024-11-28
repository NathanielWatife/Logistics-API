const Joi = require('joi');

const packageSchema = Joi.object({
  weight: Joi.number().min(0.1).required(),
  quantity: Joi.number().integer().min(1).required(),
  pickup_address: Joi.string().required(),
  delivery_address: Joi.string().required(),
  price: Joi.number().min(0).required(),
  status: Joi.string().valid('Pending', 'In Transit', 'Delivered').optional(),
});

module.exports = { packageSchema };
