/*
const Joi = require('@hapi/joi');

const registerSchema = Joi.object({
    firstName: Joi.string().min(2).max(50).trim().required(),
    lastName: Joi.string().min(2).max(50).trim().required(),
    email: Joi.string().email().min(5).max(50).lowercase().trim().required(),
    school: Joi.string().min(2).max(50).uppercase().trim().required(),
    password: Joi.string().min(5).max(50).required(),
    passwordConfirmation: Joi.valid(Joi.ref('password')).required()
})

module.exports = {
    registerSchema
}
*/