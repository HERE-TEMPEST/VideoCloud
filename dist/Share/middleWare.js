"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
function getVideoId(req, res, next) {
    var videoId = req.params.videoId;
    req.share = {
        videoId: new mongoose_1.Types.ObjectId(videoId),
    };
    next();
}
exports.getVideoId = getVideoId;
