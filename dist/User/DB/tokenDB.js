"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenDB = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var index_1 = require("../../index");
var token_model_1 = require("../models/token-model");
var TokenDB = /** @class */ (function () {
    function TokenDB() {
    }
    TokenDB.prototype.existRefreshToken = function (refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var isToken, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, token_model_1.TokenModel.findOne({ refreshToken: refreshToken })];
                    case 1:
                        isToken = _a.sent();
                        if (!isToken) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, {
                                refreshToken: isToken.refreshToken,
                                userId: isToken.userId,
                            }];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TokenDB.prototype.generateToken = function (payload) {
        try {
            var accessToken = (0, jsonwebtoken_1.sign)(payload, index_1.secretValue.SECRET_KEY_ACCESS, { expiresIn: '180m' });
            var refreshToken = (0, jsonwebtoken_1.sign)(payload, index_1.secretValue.SECRET_KEY_REFRESH, { expiresIn: '30d' });
            return {
                accessToken: accessToken,
                refreshToken: refreshToken,
            };
        }
        catch (error) {
            return null;
        }
    };
    TokenDB.prototype.removeToken = function (refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, token_model_1.TokenModel.findOneAndDelete({ refreshToken: refreshToken })];
                    case 1:
                        payload = _a.sent();
                        if (!payload) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, {
                                refreshToken: payload.refreshToken,
                                userId: payload.userId,
                            }];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TokenDB.prototype.saveToken = function (userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var isToken, newToken, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, token_model_1.TokenModel.findOne({ userId: userId })];
                    case 1:
                        isToken = _a.sent();
                        if (isToken) {
                            isToken.refreshToken = refreshToken;
                            return [2 /*return*/, isToken.save()];
                        }
                        newToken = new token_model_1.TokenModel({ refreshToken: refreshToken, userId: userId });
                        return [4 /*yield*/, newToken.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                refreshToken: newToken.refreshToken,
                                userId: newToken.userId,
                            }];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TokenDB.prototype.validateAccessToken = function (accessToken) {
        try {
            var payload = (0, jsonwebtoken_1.verify)(accessToken, index_1.secretValue.SECRET_KEY_ACCESS);
            return payload;
        }
        catch (error) {
            return null;
        }
    };
    TokenDB.prototype.validateRefreshToken = function (refreshToken) {
        try {
            var payload = (0, jsonwebtoken_1.verify)(refreshToken, index_1.secretValue.SECRET_KEY_REFRESH);
            return payload;
        }
        catch (error) {
            return null;
        }
    };
    return TokenDB;
}());
exports.tokenDB = new TokenDB();
