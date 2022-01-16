"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAuth = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var middleWare_1 = require("../middleWare");
var authConroller_1 = require("./controllers/authConroller");
exports.routerAuth = (0, express_1.Router)();
exports.routerAuth.post('/registration', [
    (0, express_validator_1.check)('email', 'email is uncorrectly').isLength({ max: 15, min: 4 }),
    (0, express_validator_1.check)('password', 'password is uncorrectly').isLength({ max: 15, min: 4 }),
], authConroller_1.AuthController.registration);
exports.routerAuth.post('/login', [
    (0, express_validator_1.check)('email', 'email is uncorrectly').isLength({ max: 15, min: 4 }),
    (0, express_validator_1.check)('password', 'password is uncorrectly').isLength({ max: 15, min: 4 }),
], authConroller_1.AuthController.login);
exports.routerAuth.post('/logout', authConroller_1.AuthController.logout);
exports.routerAuth.get('/refresh', authConroller_1.AuthController.refresh);
exports.routerAuth.get('/all', middleWare_1.tokenVerify, authConroller_1.AuthController.getAllUsers);
