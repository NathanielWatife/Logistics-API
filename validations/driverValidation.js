const Joi = require('joi');

const driverSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required(),
  license_number: Joi.string().alphanum().required(),
  vehicle_id: Joi.number().integer().optional(), // Optional if driver is not linked to a vehicle
});

module.exports = { driverSchema };
