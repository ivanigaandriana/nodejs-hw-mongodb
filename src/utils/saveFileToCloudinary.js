import cloudinary from "cloudinary";
import { env } from "../utils/env.js";
import { CLOUDINARY } from "../constants/index.js";

cloudinary.v2.config({
    secure: true,
    cloud_name: env(CLOUDINARY.CLOUDINARY_NAME),
    api_key: env(CLOUDINARY.CLOUDINARY_KEY),
    api_secret: env(CLOUDINARY.CLOUDINARY_SECRET),
});

export const saveFileToCloudinary = async (file) => {
    const response = await cloudinary.v2.uploader.upload(file.path);
    return response.secure_url;
};
