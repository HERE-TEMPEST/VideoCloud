import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  email: { required: true, type: String, unique: true },
  password: { required: true, type: String },
});

export const UserModel = model('User', UserSchema);
