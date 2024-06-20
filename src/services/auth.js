import createHttpError from "http-errors";
import {UserCollection} from "../db/Models/User.js";
import bcrypt from "bcrypt";
import ctypto from "crypto";
import { SessionsCollection } from "../db/Models/session.js";

const createSession = async () => {
    return{
        accessToken: ctypto.randomBytes(20).toString('base64'),
        refreshToken: ctypto.randomBytes(20).toString('base64'),
        accessTokenValidUntil: Date.now() + 1000 * 60 * 60,
        refreshTokenValidUntil: Date.now() + 1000 * 60 * 60 * 24*7,
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
export const loginUser = async ({email, password}) => {
    const user = await UserCollection.findOne({email});
    if (!user) {
        throw createHttpError(404, 'User not found');}
       const areEqual = await bcrypt.compare(password, user.password);
    if (!areEqual) {
        throw createHttpError(401, 'Wrong password');
    }
   await SessionsCollection.deleteOne({userId: user._id});

    return  await SessionsCollection.create({userId: user._id, ...await createSession()});
};

    export const logoutUser = async ({sessionId, sessionToken}) => {
        return await SessionsCollection.deleteOne({_id:sessionId, refreshToken:sessionToken});
    };
