import { Schema, model, Types } from 'mongoose';

const SchemaVideo = new Schema(
  {
    name: { required: true, type: String, unique: true },
    path: { required: true, type: String },
    systemname: { required: true, type: String },
    type: { required: true, type: String },
    userId: { required: true, type: Types.ObjectId },
  },
  { timestamps: true },
);

export const VideoModel = model('Video', SchemaVideo);
