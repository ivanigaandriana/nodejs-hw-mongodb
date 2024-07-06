import Joi  from 'joi';

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).messages({
        'any.required': 'Name is required',
        'string.base': 'Name must be a string',
        'string.min': 'Name must be at least {#limit} characters long',
        'string.max': 'Name must be at most {#limit} characters long',

    }),
    email: Joi.string().min(3).max(20).email().messages({
        'any.required': 'Email is required',
        'string.base': 'Email must be a string',
        'string.min': 'Email must be at least {#limit} characters long',
        'string.max': 'Email must be at most {#limit} characters long',

    }),
    phoneNumber: Joi.string().min(3).max(20).messages({
     'any.required': 'PhoneNumber is required',
        'string.base': 'PhoneNumber must be a string',
        'string.min': 'PhoneNumber must be at least {#limit} characters long',
        'string.max': 'PhoneNumber must be at most {#limit} characters long',

    }),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('personal', 'home', 'work'),

});
