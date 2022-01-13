"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var SchemaVideo = new mongoose_1.Schema({
    name: { required: true, type: String },
    path: { required: true, type: String },
    userId: { required: true, type: mongoose_1.Types.ObjectId },
}, { timestamps: true });
exports.VideoModel = mongoose_1.model('Video', SchemaVideo);
