const Joi = require('joi');

const vehicleSchema = Joi.object({
  type: Joi.string().valid('Bike', 'Car', 'Van', 'Truck').required(),
  model: Joi.string().min(2).max(100).required(),
  license_plate: Joi.string().pattern(/^[A-Z0-9-]+$/).required(),
  capacity: Joi.object({
    weight: Joi.number().min(1).required(),
    volume: Joi.object({
      length: Joi.number().min(1).required(),
      width: Joi.number().min(1).required(),
      height: Joi.number().min(1).required(),
    }).required(),
  }).required(),
});

module.exports = { vehicleSchema };
