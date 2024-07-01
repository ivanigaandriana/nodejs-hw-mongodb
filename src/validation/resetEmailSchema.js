import Joi  from 'joi';
const requestResetEmailSchema = Joi.object({
    email: Joi.string().required().email()
    
});
export default requestResetEmailSchema;
