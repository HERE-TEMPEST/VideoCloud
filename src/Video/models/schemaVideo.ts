import { Schema, model, Types } from 'mongoose';

const SchemaVideo = new Schema(
  {
    name: { required: true, type: String },
    path: { required: true, type: String },
    systemname: { required: true, type: String, unique: true },
    type: { required: true, type: String },
    userId: { required: true, type: Types.ObjectId },
  },
  { timestamps: true },
);

export const VideoModel = model('Video', SchemaVideo);
