"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ShareSchema = new mongoose_1.Schema({
    ban: { required: true, type: Array() },
    userId: { required: true, type: mongoose_1.Types.ObjectId },
    videoId: { required: true, type: mongoose_1.Types.ObjectId },
});
/*
interface IShareSchema {
  ban: Types.ObjectId[];
  userId: Types.ObjectId;
  videoId: Types.ObjectId;
}
*/
exports.ShareModel = mongoose_1.model('Share', ShareSchema);
//: Model<ShareDocument>
//export type ShareDocument = Document & IShareSchema;
