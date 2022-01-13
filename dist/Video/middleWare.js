"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
function getVideoId(req, res, next) {
    var videoId = req.params.videoId;
    req.video = {
        userId: null,
        videoId: new mongoose_1.Types.ObjectId(videoId),
    };
    next();
}
exports.getVideoId = getVideoId;
function getUserId(req, res, next) {
    var userId = req.params.userId;
    req.video = {
        userId: new mongoose_1.Types.ObjectId(userId),
        videoId: null,
    };
    next();
}
exports.getUserId = getUserId;
function getUserIdAndVideoId(req, res, next) {
    var _a = req.params, userId = _a.userId, videoId = _a.videoId;
    req.video = {
        userId: new mongoose_1.Types.ObjectId(userId),
        videoId: new mongoose_1.Types.ObjectId(videoId),
    };
    next();
}
exports.getUserIdAndVideoId = getUserIdAndVideoId;
