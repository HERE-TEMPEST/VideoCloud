"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    email: { required: true, type: String, unique: true },
    password: { required: true, type: String },
});
exports.UserModel = mongoose_1.model('User', UserSchema);
