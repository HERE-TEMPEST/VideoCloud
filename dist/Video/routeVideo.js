"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
var express_1 = require("express");
var middleWare_1 = require("../middleWare");
var controllerVideo_1 = require("../Video/controllers/controllerVideo");
var middleWare_2 = require("./middleWare");
exports.routeVideo = express_1.Router();
exports.routeVideo.delete('/:videoId', middleWare_2.getVideoId, controllerVideo_1.videoController.delete); //+
exports.routeVideo.get('/:videoId', middleWare_2.getVideoId, controllerVideo_1.videoController.download); //+
exports.routeVideo.get('/', controllerVideo_1.videoController.videos); //+
exports.routeVideo.get('/users/:userId/:videoId', middleWare_2.getUserIdAndVideoId, controllerVideo_1.videoController.uservideo); //+
exports.routeVideo.get('/users/:userId/', middleWare_2.getUserId, controllerVideo_1.videoController.uservideos); //+
exports.routeVideo.post('/', middleWare_1.upload.single('video'), controllerVideo_1.videoController.upload); //+-delVideo kogda error
exports.routeVideo.put('/:videoId', middleWare_2.getVideoId, controllerVideo_1.videoController.update); //+
exports.routeVideo.use(function (error, req, res, next) {
    var status = error.status || 500;
    var message = error.message;
    res.status(status);
    res.json({
        message: message,
        status: status,
    });
});
