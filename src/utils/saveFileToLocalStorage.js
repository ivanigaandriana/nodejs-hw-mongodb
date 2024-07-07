import fs from 'fs/promises';
import path from 'path';
import { env } from '../utils/evn.js';
import { UPLOAD_DIR } from '../constans/index.js';
import { ENV_VARS } from '../constans/index.js';
export const saveFileToLocalStorage = async (file) => {
    if (!file || !file.path || !file.filename) {
        throw new Error('Invalid file object passed to saveFileToLocalStorage');
    }

    try {
        await fs.rename(file.path, path.join(UPLOAD_DIR, file.filename));

        return `${env(ENV_VARS.APP_DOMAIN)}/uploads/${file.filename}`;
    } catch (error) {
        throw new Error(`Error saving file to upload directory: ${error.message}`);
    }
};
