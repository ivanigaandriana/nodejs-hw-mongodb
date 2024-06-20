import { createUser, loginUser, logoutUser } from '../services/auth.js';
const setupCookies = (res, session) => {
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // maxAge вказується в мілісекундах
    });
    res.cookie('sessionToken', session.refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};

export const registerUserController = async (req, res) => {
    const user = await createUser(req.body);
    res.status(200).json({
        status: 200,
        message: "Successfully registered a user!",
        data: { user },
    });
};

export const loginUserController = async (req, res) => {
    const session = await loginUser(req.body);
    setupCookies(res, session);
    res.status(200).json({
        status: 200,
        message: "Successfully logged in a user!",
        data: { accessToken: session.accessToken },
    });
};

export const logoutUserController = async (req, res) => {
    await logoutUser({ sessionId: req.cookies.sessionId, sessionToken: req.cookies.sessionToken });
    res.clearCookie('sessionId');
    res.clearCookie('sessionToken');
    res.status(204).send();
};

export const refreshTokenController = (req, res) => {

};
