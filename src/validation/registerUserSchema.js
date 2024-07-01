import Joi  from 'joi';

export const updateUserSchema = Joi.object({
    name: Joi.string().required().min(3).max(20).messages({
        'any.required': 'Name is required',
        'string.base': 'Name must be a string',
        'string.min': 'Name must be at least {#limit} characters long',
        'string.max': 'Name must be at most {#limit} characters long',

    }),
    email: Joi.string().required().min(3).max(30).email().messages({
        'any.required': 'Email is required',
        'string.base': 'Email must be a string',
        'string.min': 'Email must be at least {#limit} characters long',
        'string.max': 'Email must be at most {#limit} characters long',

    }),
    password: Joi.string().required().min(3).max(20).messages({
     'any.required': 'Password is required',
        'string.base': 'Password must be a string',
        'string.min': 'Password must be at least {#limit} characters long',
        'string.max': 'Password must be at most {#limit} characters long',

    }),
});
