import {Schema, model} from "mongoose";
 export const sessionModel = new Schema({
    userId:{type: Schema.ObjectId, required: true,unique:true},
    accessToken:{type: String, required: true},
    refreshToken:{type: String, required: true},
    accessTokenValidUntil:{type: Date, required: true},
    refreshTokenValidUntil:{type: Date, required: true},},
    {
        timestamps: true, versionKey: false,});


export const SessionsCollection = model('sessions', sessionModel);
