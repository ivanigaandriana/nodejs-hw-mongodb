import createHttpError from "http-errors";
import {UserCollection} from "../db/Models/User.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { SessionsCollection } from "../db/Models/session.js";

const createSession = async () => {
    return {
        accessToken: crypto.randomBytes(20).toString('base64'),
        refreshToken: crypto.randomBytes(20).toString('base64'),
        accessTokenValidUntil: new Date(Date.now() + 1000 * 60 * 15),  // 15 хвилин
        refreshTokenValidUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),  // 30 днів
    };
};
export const createUser = async (payload) => {
    const haschedPassword = await bcrypt.hash(payload.password, 10);
    const user = await UserCollection.findOne({email: payload.email});
    if (user) {
        throw createHttpError(409, 'Email in use');
    }

   return  await UserCollection.create({...payload, password: haschedPassword});
};

// export const loginUser = async ({ email, password }) => {
//     const user = await UserCollection.findOne({ email });
//     if (!user) {
//         throw createHttpError(404, 'User not found');
//     }
//     const areEqual = await bcrypt.compare(password, user.password);
//     if (!areEqual) {
//         throw createHttpError(401, 'Wrong password');
//     }
//     await SessionsCollection.deleteOne({ userId: user._id });

//     const sessionData = await createSession();
//     return await SessionsCollection.create({ userId: user._id, ...sessionData });
// };
export const loginUser = async ({ email, password }) => {
    console.log(`Attempting to login user with email: ${email}`);
    const user = await UserCollection.findOne({ email });
    if (!user) {
        console.error('User not found during login');
        throw createHttpError(404, 'User not found');
    }
    console.log(`User found: ${user._id}`);
    const areEqual = await bcrypt.compare(password, user.password);
    if (!areEqual) {
        console.error('Wrong password');
        throw createHttpError(401, 'Wrong password');
    }
    await SessionsCollection.deleteOne({ userId: user._id });

    const sessionData = await createSession();
    const newSession = await SessionsCollection.create({ userId: user._id, ...sessionData });
    console.log('User logged in, session created:', newSession);
    return newSession;
};

    export const logoutUser = async ({sessionId, sessionToken}) => {
        return await SessionsCollection.deleteOne({_id:sessionId, refreshToken:sessionToken});
    };

export const refreshSession = async ({ sessionId, sessionToken }) => {
    const session = await SessionsCollection.findOne({ _id: sessionId, refreshToken: sessionToken });
    if (!session) {
        throw createHttpError(401, 'Session not found');
    }
    if (new Date() > session.refreshTokenValidUntil) {
        throw createHttpError(401, 'Refresh token expired');
    }
    const user = await UserCollection.findById(session.userId);
    if (!user) {
        throw createHttpError(401, 'User not found');
    }
    await SessionsCollection.deleteOne({ _id: sessionId });

    const newSession = await createSession(); // Викликаємо функцію createSession
    return await SessionsCollection.create({ userId: user._id, ...newSession });
};
