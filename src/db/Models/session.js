import { Schema, model } from "mongoose";

export const sessionModel = new Schema({
    userId: { type: Schema.ObjectId, required: true, unique: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: { type: Number ,required: true },
    refreshTokenValidUntil: { type: Number, required: true }
}, {
    timestamps: true,
    versionKey: false
});

export const Sessions = model('session', sessionModel);
