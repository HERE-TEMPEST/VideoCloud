"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
var express_1 = require("express");
var controllerShare_1 = require("./controllers/controllerShare");
var middleWare_1 = require("./middleWare");
exports.routeShare = express_1.Router();
exports.routeShare.put('/access/:videoId', middleWare_1.getVideoId, controllerShare_1.shareController.access);
exports.routeShare.put('/accessAll/:videoId', middleWare_1.getVideoId, controllerShare_1.shareController.accessAll);
exports.routeShare.put('/ban/:videoId', middleWare_1.getVideoId, controllerShare_1.shareController.ban);
exports.routeShare.put('/banAll/:videoId', middleWare_1.getVideoId, controllerShare_1.shareController.banAll);
exports.routeShare.use(function (error, req, res, next) {
    var status = error.status || 500;
    var message = error.message;
    res.status(status);
    res.json({
        message: message,
        status: status,
    });
});
