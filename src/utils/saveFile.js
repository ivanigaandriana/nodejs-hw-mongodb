import { ENV_VARS } from "../constants/index.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { saveFileToLocalStorage } from "../utils/saveFileToLocalStorage.js";
import { env } from "../utils/env.js";

export const saveFile = async (file) => {
    let url;
    const isCloudinary = env(ENV_VARS.ENABLED_CLOUDINARY);
    if (isCloudinary === 'true') {
        url = await saveFileToCloudinary(file);
    } else {
        url = await saveFileToLocalStorage(file);
    }
    return url;
};
