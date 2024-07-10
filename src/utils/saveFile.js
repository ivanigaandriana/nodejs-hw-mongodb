import { ENV_VARS } from "../constans/index.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { saveFileToLocalStorage } from "../utils/saveFileToLocalStorage.js";
import { env } from "../utils/evn.js";

export const saveFile = async (file) => {
    let url;
    const isCloudinary = env(ENV_VARS.ENABLED_CLOUDINARY);
    console.log(`ENABLED_CLOUDINARY: ${isCloudinary}`);
    if (isCloudinary === 'true') {
        console.log('Uploading to Cloudinary');
        url = await saveFileToCloudinary(file);
    } else {
        console.log('Saving to local storage');
        url = await saveFileToLocalStorage(file);
    }
    return url;
};

