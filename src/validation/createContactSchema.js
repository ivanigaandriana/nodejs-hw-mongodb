import Joi  from 'joi';

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'any.required': 'Name is required',
        'string.base': 'Name must be a string',
        'string.min': 'Name must be at least {#limit} characters long',
        'string.max': 'Name must be at most {#limit} characters long',

    }),
    email: Joi.string().min(3).max(20).email().required().messages({
        'any.required': 'Name is required',
        'string.base': 'Name must be a string',
        'string.min': 'Name must be at least {#limit} characters long',
        'string.max': 'Name must be at most {#limit} characters long',

    }),
    phone: Joi.string().min(3).max(20).required().messages({
        'any.required': 'Name is required',
        'string.base': 'Name must be a string',
        'string.min': 'Name must be at least {#limit} characters long',
        'string.max': 'Name must be at most {#limit} characters long',

    }),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('personal', 'home', 'work').required(),

});

