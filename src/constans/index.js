import path from 'path';

 export const ENV_VARS = {
    PORT: 'PORT',
    JWT_SECRET: 'JWT_SECRET',
    APP_DOMAIN: 'APP_DOMAIN',
    ENABLED_CLOUDINARY: 'ENABLED_CLOUDINARY',
};
export const MONGO_VARS = {
    MONGODB_USER: 'MONGODB_USER',
MONGODB_PASSWORD: 'MONGODB_PASSWORD',
MONGODB_URL: 'MONGODB_URL',
MONGODB_DB: 'MONGODB_DB',
};

export const SORT_ORDER = {
ASC:'asc',
DESC:'desc',
};

export const EMAIL_VARS = {
    SMTP_HOST: 'SMTP_HOST',
    SMTP_PORT: 'SMTP_PORT',
    SMTP_USER: 'SMTP_USER',
    SMTP_PASSWORD: 'SMTP_PASSWORD',
    SMTP_FROM: 'SMTP_FROM',

};

export const TEMPLATER_DIR = path.join(process.cwd(), 'src', 'templates');
export const TEMP_UPLOAD_DIR = path.join(process.cwd(),  'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'upload');

export const CLOUDINARY = {
        CLOUDINARY_NAME: 'CLOUDINARY_NAME',
        CLOUDINARY_KEY: 'CLOUDINARY_KEY',
        CLOUDINARY_SECRET: 'CLOUDINARY_SECRET',
    };
