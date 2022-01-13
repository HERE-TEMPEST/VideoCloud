"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ControllerUser_1 = require("./ControllerUser");
exports.routeUser = express_1.default();
var controller = new ControllerUser_1.UserController();
exports.routeUser.post('/registration', controller.registration);
exports.routeUser.get('/login', controller.login);
exports.routeUser.delete('/delete', controller.delete);
