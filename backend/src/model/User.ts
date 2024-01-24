import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    avatarImage: Buffer
});

const UserModel = mongoose.model('user', UserSchema);

export { UserModel }