"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoModel = void 0;
var mongoose_1 = require("mongoose");
var SchemaVideo = new mongoose_1.Schema({
    name: { required: true, type: String },
    path: { required: true, type: String },
    systemname: { required: true, type: String, unique: true },
    type: { required: true, type: String },
    userId: { required: true, type: mongoose_1.Types.ObjectId },
}, { timestamps: true });
exports.VideoModel = (0, mongoose_1.model)('Video', SchemaVideo);
