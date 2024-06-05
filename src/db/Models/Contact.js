import {Schema, model} from "mongoose";
 export const contactModel = new Schema({
    name:{type: String, required: true},
    phoneNumber:{type: Number, required: true},
    email:{type: String, optional: false},
    isFavourite:{type: Boolean, default: true},
    contactType:{type: String, required: true, default: "personal", enum: ["personal", "home", "work"],}},
    {
        timestamps: true, versionKey: false,});


export const Contact = model('contacts', contactModel);
