import createHttpError from "http-errors";
import {User} from "../db/Models/User.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Sessions } from "../db/Models/session.js";
import jwt from "jsonwebtoken";
import { ENV_VARS ,EMAIL_VARS,TEMPLATER_DIR} from "../constans/index.js";
import { env } from "../utils/evn.js";
import { sendEmail } from "../utils/sendEmail.js";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
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
    const user = await User.findOne({email: payload.email});
    if (user) {
        throw createHttpError(409, 'Email in use');
    }

   return  await User.create({...payload, password: haschedPassword});
};


export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw createHttpError(404, 'User not found');
    }
    const areEqual = await bcrypt.compare(password, user.password);
    if (!areEqual) {
        throw createHttpError(401, 'Wrong password');
    }
    await Sessions.deleteOne({ userId: user._id });

    const sessionData = await createSession();
    const newSession = await Sessions.create({ userId: user._id, ...sessionData });
    return newSession;
};

    export const logoutUser = async ({sessionId, sessionToken}) => {
        return await Sessions.deleteOne({_id:sessionId, refreshToken:sessionToken});
    };

export const refreshSession = async ({ sessionId, sessionToken }) => {
    const session = await Sessions.findOne({ _id: sessionId, refreshToken: sessionToken });
    if (!session) {
        throw createHttpError(401, 'Session not found');
    }
    if (new Date() > session.refreshTokenValidUntil) {
        throw createHttpError(401, 'Refresh token expired');
    }
    const user = await User.findById(session.userId);
    if (!user) {
        throw createHttpError(401, 'User not found');
    }
    await Sessions.deleteOne({ _id: sessionId });

    const newSession = await createSession(); // Викликаємо функцію createSession
    return await Sessions.create({ userId: user._id, ...newSession });
};
export const reguestResetToken = async (email,fromEmail) => {
    const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env(ENV_VARS.JWT_SECRET),
    {
      expiresIn: '15m',
    },
  );

  const resetPasswordTemplatePath = path.join(
    TEMPLATER_DIR,
    'send-reset-password.html',
  );

  const templateSource = (
    await fs.promises.readFile(resetPasswordTemplatePath)
  ).toString();

  const template = handlebars.compile(templateSource);

  const html = template({
    name: user.name,
    link: `${env(ENV_VARS.APP_DOMAIN)}/reset-password?token=${resetToken}`,
  });

  try {
    await sendEmail({
      from:fromEmail,
      //  env(EMAIL_VARS.SMTP_FROM),
      to: email,
      subject: 'Reset your password',
      html,
    });
  } catch (error) {
    console.log(error);

    throw createHttpError(500, 'Problem with sending email');
  }
};
export const resetPassword = async (payload) => {
    let entries;
    try {
      entries =  jwt.verify(payload.token, env(ENV_VARS.JWT_SECRET));
    } catch (error) {
if(error instanceof Error)throw createHttpError(401, error.message);
throw error;
    }
const user = await User.findOne({ _id: entries.sub, email: entries.email });
if(!user){
    throw createHttpError(404, 'User not found');
}
const haschedPassword = await bcrypt.hash(payload.password, 10);
await User.updateOne({ _id: user._id }, { password: haschedPassword });
};
