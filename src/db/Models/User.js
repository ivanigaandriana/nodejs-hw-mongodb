import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true, },
    email: {type: String, required: true,unique: true  },
    password: {type: String, required: true},
    // contacts: [{ type: Schema.Types.ObjectId, ref: 'Contact' }],
}, {
    timestamps: true,
    versionKey: false,
});


userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};

export const User = model('users', userSchema);
