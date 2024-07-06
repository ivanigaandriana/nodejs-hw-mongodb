import {Router} from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import  validateBody  from '../middlewares/validateBody.js';
import  {registerUserSchema} from '../validation/registerUserSchema.js';
import resetPasswordSchema from '../validation/resetPasswordSchema.js';
import requestResetEmailSchema from '../validation/resetEmailSchema.js';
import {registerUserController,loginUserController,logoutUserController,refreshTokenController
    ,requestResetEmailController,
    resetPasswordController
} from '../controllers/auth.js';
const authRouter =  Router();
authRouter.post('/register',validateBody(registerUserSchema),ctrlWrapper(registerUserController));
authRouter.post('/login', ctrlWrapper(loginUserController));
authRouter.post('/logout',ctrlWrapper(logoutUserController));
authRouter.post ('/refresh',ctrlWrapper(refreshTokenController));
authRouter.post('/send-reset-email', validateBody( requestResetEmailSchema),ctrlWrapper(requestResetEmailController));
authRouter.post('/reset-pwd',validateBody(resetPasswordSchema),
ctrlWrapper(resetPasswordController)
);
export default authRouter;
