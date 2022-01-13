"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var TokenSchema = new mongoose_1.Schema({
    refreshToken: { required: true, type: String },
    userId: { required: true, type: mongoose_1.Types.ObjectId },
});
exports.TokenModel = mongoose_1.model('Token', TokenSchema);
