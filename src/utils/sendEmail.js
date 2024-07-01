import nodemailer from 'nodemailer';
import { env } from '../utils/evn.js';
import { EMAIL_VARS } from '../constans/index.js';

const transport = nodemailer.createTransport({
    host: env(EMAIL_VARS.SMTP_HOST),
    port: parseInt(env(EMAIL_VARS.SMTP_PORT), 10), // Перевірка числового типу порту
    auth: {
        user: env(EMAIL_VARS.SMTP_USER),
        pass: env(EMAIL_VARS.SMTP_PASSWORD),
    }
});

export const sendEmail = async (options) => {
    console.log('Email options:', options); // Додайте лог для перевірки
    return await transport.sendMail(options);
};

