import {Schema, model} from "mongoose";
 export const userModel = new Schema({
    name:{type: String, required: true},
    email:{type: String, required: true,email:true,unique:true},
    password:{type: String, required: true},
  createdAt:{type: Date, default: Date.now},
  updatedAt:{type: Date, default: Date.now},},
    {
        timestamps: true, versionKey: false,});

userModel.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};
export const UserCollection = model('users', userModel);
