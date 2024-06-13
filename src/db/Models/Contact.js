import {Schema, model} from "mongoose";
 export const contactModel = new Schema({
    name:{type: String, required: true},
    phoneNumber:{type: String, required: true},
    email:{type: String, required: false,},
    isFavourite:{type: Boolean, default: false,},
    contactType:{type: String, required: true, default: "personal", enum: ["personal", "home", "work"],}},
    {
        timestamps: true, versionKey: false,});


export const ContactsCollection = model('contacts', contactModel);
