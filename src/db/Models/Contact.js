
// import {Schema, model} from "mongoose";
//  export const contactModel = new Schema({
//     name: { type: String, required: true },
//     phoneNumber: { type: String, required: true },
//     email: { type: String, required: false },
//     isFavourite: { type: Boolean, default: false },
//     contactType: { type: String, required: true, default: "personal", enum: ["personal", "home", "work"] },
//     userId: { type: Schema.Types.ObjectId, ref: 'users', },
//     photo: {type: String,},
// }, {
//     timestamps: true,
//     versionKey: false
// });
import {Schema, model} from "mongoose";
 export const contactModel = new Schema({
    name:{type: String, required: true},
    phoneNumber:{type: String, required: true},
    email:{type: String},
    isFavourite:{type: Boolean, default: false,},
    contactType:{type: String,  default: "personal", enum: ["personal", "home", "work"]},
    userId: { type: Schema.Types.ObjectId,  },
    photo: {type: String,},},
    {
        timestamps: true, versionKey: false,});

export const Contacts = model('contacts', contactModel);
