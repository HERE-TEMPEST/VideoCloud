"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ControllerUser_1 = require("./ControllerUser");
exports.routeUser = express_1.Router();
var controller = new ControllerUser_1.UserController();
exports.routeUser.post('/registration', controller.registration);
exports.routeUser.post('/login', controller.login);
