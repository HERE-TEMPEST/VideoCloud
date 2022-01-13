"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var authConroller_1 = require("./controllers/authConroller");
exports.routerAuth = express_1.Router();
exports.routerAuth.post('/registration', [
    express_validator_1.check('email', 'email is uncorrectly').isLength({ max: 15, min: 4 }),
    express_validator_1.check('password', 'password is uncorrectly').isLength({ max: 15, min: 4 }),
], authConroller_1.AuthController.registration);
exports.routerAuth.post('/login', [
    express_validator_1.check('email', 'email is uncorrectly').isLength({ max: 15, min: 4 }),
    express_validator_1.check('password', 'password is uncorrectly').isLength({ max: 15, min: 4 }),
], authConroller_1.AuthController.login);
exports.routerAuth.post('/logout', authConroller_1.AuthController.logout);
exports.routerAuth.get('/refresh', authConroller_1.AuthController.refresh);
