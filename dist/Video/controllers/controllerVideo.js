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
exports.videoController = void 0;
var videoService_1 = require("../service/videoService");
var ControllerVideo = /** @class */ (function () {
    function ControllerVideo() {
    }
    ControllerVideo.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var delVideo, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, videoService_1.videoService.delete(req.user.userId, req.video.videoId)];
                    case 1:
                        delVideo = _a.sent();
                        return [2 /*return*/, res.status(200).json(delVideo)];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, next(error_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ControllerVideo.prototype.download = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var streamVideo, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, videoService_1.videoService.download(req.user.userId, req.video.videoId)];
                    case 1:
                        streamVideo = _a.sent();
                        return [2 /*return*/, streamVideo.pipe(res)];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, next(error_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ControllerVideo.prototype.update = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var newname, updateVideo, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        newname = req.body.newname;
                        return [4 /*yield*/, videoService_1.videoService.update(req.user.userId, req.video.videoId, newname)];
                    case 1:
                        updateVideo = _a.sent();
                        return [2 /*return*/, res.status(200).json(updateVideo)];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, next(error_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ControllerVideo.prototype.upload = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var uploadVideo, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, videoService_1.videoService.upload(req.user.userId, req.file)];
                    case 1:
                        uploadVideo = _a.sent();
                        return [2 /*return*/, res.status(200).json(uploadVideo)];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, next(error_4)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ControllerVideo.prototype.uservideo = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userId, videoId, userVideo, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.video, userId = _a.userId, videoId = _a.videoId;
                        return [4 /*yield*/, videoService_1.videoService.uservideo(req.user.userId, userId, videoId)];
                    case 1:
                        userVideo = _b.sent();
                        return [2 /*return*/, res.status(200).json(userVideo)];
                    case 2:
                        error_5 = _b.sent();
                        return [2 /*return*/, next(error_5)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ControllerVideo.prototype.uservideos = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userVideos, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, videoService_1.videoService.uservideos(req.user.userId, req.video.userId)];
                    case 1:
                        userVideos = _a.sent();
                        return [2 /*return*/, res.status(200).json(userVideos)];
                    case 2:
                        error_6 = _a.sent();
                        return [2 /*return*/, next(error_6)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ControllerVideo.prototype.videos = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userVideos, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, videoService_1.videoService.videos(req.user.userId)];
                    case 1:
                        userVideos = _a.sent();
                        return [2 /*return*/, res.status(200).json(userVideos)];
                    case 2:
                        error_7 = _a.sent();
                        return [2 /*return*/, next(error_7)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ControllerVideo;
}());
exports.videoController = new ControllerVideo();
