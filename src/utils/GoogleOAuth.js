import fs from 'fs';
import { OAuth2Client } from 'google-auth-library';
import path from 'path';
import { env } from '../utils/evn.js';
import { GOOGLE } from '../constans/index.js';
import createHttpError from 'http-errors';
const googleConfige= JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'google.json')).toString(),);

const client = new OAuth2Client({
    clientId:env(GOOGLE.CLIENT_ID),
    clientSecret:env(GOOGLE.CLIENT_SECRET),
    progect_id:googleConfige.web.progect_id,
    redirectUri:googleConfige.web.redirect_uris[0],
});

export const generateOAuthUrl = () => {
    return client.generateAuthUrl({
        scope:[
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',

        ],
    });
};
export const validateCode = async (code) => {
    const responce = await client.getToken(code);
    if(!responce.tokens.id_token) throw createHttpError(401, 'Unathorized');
    const ticket = await client.verifyIdToken({
        idToken:responce.tokens.id_token,
    });
    // return ticket;

    return {
        payload: ticket.getPayload(),
        tokens: responce.tokens,
    };
};

export const getFullNameFromGoogle = (payload) => {
    let fullName = 'Guest';
    if(payload.given_name && payload.family_name) {
        fullName = `${payload.given_name} ${payload.family_name}`;
    } else if(payload.given_name) {
        fullName = payload.given_name;
    };
    return fullName;
    };


