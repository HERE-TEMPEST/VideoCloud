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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var promises_1 = __importDefault(require("fs/promises"));
var SchemaVideo_1 = require("../models/SchemaVideo");
var VideoService = /** @class */ (function () {
    function VideoService() {
    }
    VideoService.prototype.addVideo = function (userId, file) {
        return __awaiter(this, void 0, void 0, function () {
            var name_1, path, systemname, type, isVideo, newVideo, outputDate, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        name_1 = file.name, path = file.path, systemname = file.systemname, type = file.type;
                        return [4 /*yield*/, SchemaVideo_1.VideoModel.findOne({ name: name_1, userId: userId })];
                    case 1:
                        isVideo = _a.sent();
                        if (!isVideo) return [3 /*break*/, 3];
                        return [4 /*yield*/, promises_1.default.rm(path)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, null];
                    case 3:
                        newVideo = new SchemaVideo_1.VideoModel({
                            name: name_1,
                            path: path,
                            systemname: systemname,
                            type: type,
                            userId: userId,
                        });
                        return [4 /*yield*/, newVideo.save()];
                    case 4:
                        _a.sent();
                        outputDate = {
                            created: newVideo.createdAt,
                            name: newVideo.name,
                            path: newVideo.path,
                            systemname: newVideo.systemname,
                            type: newVideo.type,
                            updated: newVideo.updatedAt,
                            userId: userId,
                            videoId: newVideo._id,
                        };
                        return [2 /*return*/, outputDate];
                    case 5:
                        error_1 = _a.sent();
                        console.log('error', error_1);
                        return [2 /*return*/, null];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    VideoService.prototype.delVideo = function (userId, name) {
        return __awaiter(this, void 0, void 0, function () {
            var delFile, path, outputDate, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, SchemaVideo_1.VideoModel.findOneAndDelete({ name: name, userId: userId })];
                    case 1:
                        delFile = _a.sent();
                        if (!delFile) {
                            return [2 /*return*/, null];
                        }
                        path = delFile.path;
                        promises_1.default.rm(path);
                        outputDate = {
                            created: delFile.createdAt,
                            name: delFile.name,
                            path: delFile.path,
                            systemname: delFile.systemname,
                            type: delFile.type,
                            updated: delFile.updatedAt,
                            userId: userId,
                            videoId: delFile._id,
                        };
                        return [2 /*return*/, outputDate];
                    case 2:
                        error_2 = _a.sent();
                        console.log('error', error_2);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VideoService.prototype.editVideo = function (userId, name, newname) {
        return __awaiter(this, void 0, void 0, function () {
            var isVideo, updateVideo, outputDate, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, SchemaVideo_1.VideoModel.findOne({ name: name, userId: userId })];
                    case 1:
                        isVideo = _a.sent();
                        if (!isVideo) {
                            return [2 /*return*/, null];
                        }
                        isVideo.name = newname;
                        return [4 /*yield*/, isVideo.save()];
                    case 2:
                        updateVideo = _a.sent();
                        console.log('updateVideo', updateVideo);
                        outputDate = {
                            created: updateVideo.createdAt,
                            name: updateVideo.name,
                            path: updateVideo.path,
                            systemname: updateVideo.systemname,
                            type: updateVideo.type,
                            updated: updateVideo.updatedAt,
                            userId: userId,
                            videoId: updateVideo._id,
                        };
                        return [2 /*return*/, outputDate];
                    case 3:
                        error_3 = _a.sent();
                        console.log('error', error_3);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    VideoService.prototype.getAllVideo = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var areVideos, outputFiles, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, SchemaVideo_1.VideoModel.find({ userId: userId })];
                    case 1:
                        areVideos = _a.sent();
                        if (!areVideos) {
                            return [2 /*return*/, null];
                        }
                        outputFiles = areVideos.map(function (element) {
                            var video = {
                                created: element.createdAt,
                                name: element.name,
                                path: element.path,
                                systemname: element.systemname,
                                type: element.type,
                                updated: element.updatedAt,
                                userId: userId,
                                videoId: element._id,
                            };
                            return video;
                        });
                        return [2 /*return*/, outputFiles];
                    case 2:
                        error_4 = _a.sent();
                        console.log('error', error_4);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VideoService.prototype.getVideo = function (userId, name) {
        return __awaiter(this, void 0, void 0, function () {
            var isVideo, outputDate, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, SchemaVideo_1.VideoModel.findOne({ name: name, userId: userId })];
                    case 1:
                        isVideo = _a.sent();
                        if (!isVideo) {
                            return [2 /*return*/, null];
                        }
                        outputDate = {
                            created: isVideo.createdAt,
                            name: isVideo.name,
                            path: isVideo.path,
                            systemname: isVideo.systemname,
                            type: isVideo.type,
                            updated: isVideo.updatedAt,
                            userId: userId,
                            videoId: isVideo._id,
                        };
                        return [2 /*return*/, outputDate];
                    case 2:
                        error_5 = _a.sent();
                        console.log('error', error_5);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return VideoService;
}());
exports.serviceVideo = new VideoService();
