"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeShare = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
var express_1 = require("express");
var controllerShare_1 = require("./controllers/controllerShare");
var middleWare_1 = require("./middleWare");
exports.routeShare = (0, express_1.Router)();
exports.routeShare.put('/access/:videoId', middleWare_1.getVideoId, controllerShare_1.shareController.access); //+
exports.routeShare.put('/accessAll/:videoId', middleWare_1.getVideoId, controllerShare_1.shareController.accessAll); //+
exports.routeShare.put('/ban/:videoId', middleWare_1.getVideoId, controllerShare_1.shareController.ban); //+
exports.routeShare.put('/banAll/:videoId', middleWare_1.getVideoId, controllerShare_1.shareController.banAll); //+
