import Joi  from 'joi';
const resetPasswordSchema = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().required().min(6).max(30),

});
export default resetPasswordSchema ;
