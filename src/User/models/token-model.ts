import { Schema, model, Types } from 'mongoose';

const TokenSchema = new Schema({
  refreshToken: { required: true, type: String },
  userId: { required: true, type: Types.ObjectId },
});

export const TokenModel = model('Token', TokenSchema);
