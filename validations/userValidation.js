const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(100).required(),
    phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).optional(),
});
module.exports = { userSchema };