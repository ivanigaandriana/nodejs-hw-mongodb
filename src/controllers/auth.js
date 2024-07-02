import { createUser, loginUser, logoutUser, refreshSession, requestResetToken, resetPassword } from '../services/auth.js';
import createHttpError from 'http-errors';
const setupCookies = (res, session) => {
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 днів у мілісекундах
    });
    res.cookie('sessionToken', session.refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 днів у мілісекундах
    });
};


export const registerUserController = async (req, res, next) => {
    try {
      const newUser = await createUser(req.body);
      res.status(201).json({
        status: 201,
        message: "User is created!",
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  };
export const loginUserController = async (req, res) => {
    try {
        console.log('Login request body:', req.body);
        const session = await loginUser(req.body);
        setupCookies(res, session);
        res.json({
            status: 200,
            message: "User is logged in!",
            data: { accessToken: session.accessToken },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(error.status || 500).json({
            status: error.status || 500,
            message: error.message || 'Something went wrong',
            data: { message: error.message || 'Something went wrong' },
        });
    }
};
export const logoutUserController = async (req, res) => {
    await logoutUser({ sessionId: req.cookies.sessionId, sessionToken: req.cookies.sessionToken });
    res.clearCookie('sessionId');
    res.clearCookie('sessionToken');
    res.status(204).send();
};

export const refreshTokenController = async (req, res) => {
    const { sessionId, sessionToken } = req.cookies;
    if (!sessionId || !sessionToken) {
        throw createHttpError(401, 'Session not found');
    }
    const session = await refreshSession({ sessionId, sessionToken });
    setupCookies(res, session);
    res.json({
        status: 200,
        message: "Token refreshed!",
        data: { accessToken: session.accessToken },
    });
};
export const requestResetEmailController = async (req, res, next) => {
    try {
        await requestResetToken(req.body.email);
        res.status(200).json({
            status: 200,
            message: "Reset password email has been successfully sent.",
            data: {}
        });
    } catch (error) {
        next(error);
    }
};
export const resetPasswordController = async (req, res, next) => {
    try {
        await resetPassword(req.body);
        res.status(200).json({
            status: 200,
            message: "Password was successfully reset.",
            data: {},
        });
    } catch (error) {
        next(error);
    }
};
