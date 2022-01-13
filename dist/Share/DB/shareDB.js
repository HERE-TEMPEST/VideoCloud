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
var share_model_1 = require("../models/share-model");
var ShareDB = /** @class */ (function () {
    function ShareDB() {
    }
    ShareDB.prototype.addAccess = function (usersId, videoId) {
        return __awaiter(this, void 0, void 0, function () {
            var isShare, outData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, share_model_1.ShareModel.findOne({ videoId: videoId })];
                    case 1:
                        isShare = _a.sent();
                        if (!isShare) {
                            return [2 /*return*/, null];
                        }
                        isShare.ban = isShare.ban.filter(function (elem) {
                            var isUser = usersId.find(function (element) {
                                return element.equals(elem);
                            });
                            return !isUser;
                        });
                        return [4 /*yield*/, isShare.save()];
                    case 2:
                        _a.sent();
                        outData = {
                            ban: isShare.ban,
                            userId: isShare.userId,
                            videoId: videoId,
                        };
                        return [2 /*return*/, outData];
                    case 3:
                        error_1 = _a.sent();
                        console.log('error', error_1);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ShareDB.prototype.addBan = function (usersId, videoId) {
        return __awaiter(this, void 0, void 0, function () {
            var isShare_1, outData, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, share_model_1.ShareModel.findOne({ videoId: videoId })];
                    case 1:
                        isShare_1 = _a.sent();
                        if (!isShare_1) {
                            return [2 /*return*/, null];
                        }
                        isShare_1.ban += usersId.filter(function (elem) {
                            var isUser = isShare_1.ban.find(function (element) {
                                return element.toString() == elem.toString();
                            });
                            return !isUser;
                        });
                        return [4 /*yield*/, isShare_1.save()];
                    case 2:
                        _a.sent();
                        outData = {
                            ban: isShare_1.ban,
                            userId: isShare_1.userId,
                            videoId: videoId,
                        };
                        return [2 /*return*/, outData];
                    case 3:
                        error_2 = _a.sent();
                        console.log('error', error_2);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ShareDB.prototype.addShare = function (userId, videoId, usersId) {
        return __awaiter(this, void 0, void 0, function () {
            var newShare, outData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newShare = new share_model_1.ShareModel({ ban: usersId, userId: userId, videoId: videoId });
                        return [4 /*yield*/, newShare.save()];
                    case 1:
                        _a.sent();
                        outData = {
                            ban: newShare.ban,
                            userId: newShare.userId,
                            videoId: videoId,
                        };
                        return [2 /*return*/, outData];
                }
            });
        });
    };
    ShareDB.prototype.checkAccess = function (checkUser, videoId) {
        return __awaiter(this, void 0, void 0, function () {
            var isShare, isUser, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, share_model_1.ShareModel.findOne({ videoId: videoId })];
                    case 1:
                        isShare = _a.sent();
                        if (!isShare) {
                            return [2 /*return*/, false];
                        }
                        isUser = isShare.ban.find(function (element) {
                            return element.toString() == checkUser.toString();
                        });
                        return [2 /*return*/, !isUser];
                    case 2:
                        error_3 = _a.sent();
                        console.log('error', error_3);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ShareDB.prototype.delShare = function (videoId) {
        return __awaiter(this, void 0, void 0, function () {
            var delShare, outData, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, share_model_1.ShareModel.findOneAndDelete({ videoId: videoId })];
                    case 1:
                        delShare = _a.sent();
                        if (!delShare) {
                            return [2 /*return*/, null];
                        }
                        outData = {
                            ban: delShare.ban,
                            userId: delShare.userId,
                            videoId: videoId,
                        };
                        return [2 /*return*/, outData];
                    case 2:
                        error_4 = _a.sent();
                        console.log('error', error_4);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ShareDB;
}());
exports.shareDB = new ShareDB();
