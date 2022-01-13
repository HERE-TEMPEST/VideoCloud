import { Schema, model, Types } from 'mongoose';

const ShareSchema = new Schema({
  ban: { required: true, type: Array<Types.ObjectId>() },
  userId: { required: true, type: Types.ObjectId },
  videoId: { required: true, type: Types.ObjectId },
});

/*
interface IShareSchema {
  ban: Types.ObjectId[];
  userId: Types.ObjectId;
  videoId: Types.ObjectId;
}
*/
export const ShareModel = model('Share', ShareSchema);
//: Model<ShareDocument>
//export type ShareDocument = Document & IShareSchema;
