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
var fs_1 = __importDefault(require("fs"));
var posix_1 = require("path/posix");
var Error_1 = require("../../Error");
var shareDB_1 = require("../../Share/DB/shareDB");
var serviceUser_1 = require("../../User/service/serviceUser");
var videoDB_1 = require("../DB/videoDB");
var VideoService = /** @class */ (function () {
    function VideoService() {
    }
    VideoService.prototype.delete = function (userId, videoId) {
        return __awaiter(this, void 0, void 0, function () {
            var video;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, videoDB_1.videoDB.delVideo(userId, videoId)];
                    case 1:
                        video = _a.sent();
                        if (!video) {
                            throw new Error_1.MyError('video not found', 404);
                        }
                        return [4 /*yield*/, shareDB_1.shareDB.delShare(video.videoId)];
                    case 2:
                        _a.sent();
                        fs_1.default.rmSync(video.path);
                        return [2 /*return*/, {
                                message: 'file deleted',
                                video: video,
                            }];
                }
            });
        });
    };
    VideoService.prototype.download = function (userId, videoId) {
        return __awaiter(this, void 0, void 0, function () {
            var video, a;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, videoDB_1.videoDB.getVideo(userId, videoId)];
                    case 1:
                        video = _a.sent();
                        if (!video) {
                            throw new Error_1.MyError('video not found', 404);
                        }
                        a = fs_1.default.createReadStream(video.path);
                        return [2 /*return*/, a];
                }
            });
        });
    };
    VideoService.prototype.update = function (userId, videoId, newname) {
        return __awaiter(this, void 0, void 0, function () {
            var isUpdate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, videoDB_1.videoDB.editVideo(userId, videoId, newname)];
                    case 1:
                        isUpdate = _a.sent();
                        if (!isUpdate) {
                            throw new Error_1.MyError('video not found', 404);
                        }
                        return [2 /*return*/, isUpdate];
                }
            });
        });
    };
    VideoService.prototype.upload = function (userId, file) {
        return __awaiter(this, void 0, void 0, function () {
            var inData, newVideo, users, newShare;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        inData = {
                            name: file.originalname,
                            path: file.path,
                            systemname: file.filename,
                            type: posix_1.extname(file.originalname),
                        };
                        return [4 /*yield*/, videoDB_1.videoDB.addVideo(userId, inData)];
                    case 1:
                        newVideo = _a.sent();
                        if (!newVideo) {
                            throw new Error_1.MyError('video exist in user', 404);
                        }
                        return [4 /*yield*/, serviceUser_1.ServiceUser.getAllUsers()];
                    case 2:
                        users = _a.sent();
                        // users
                        users = users.filter(function (element) {
                            return element != userId;
                        });
                        return [4 /*yield*/, shareDB_1.shareDB.addShare(userId, newVideo.videoId, users)];
                    case 3:
                        newShare = _a.sent();
                        if (!!newShare) return [3 /*break*/, 5];
                        return [4 /*yield*/, videoDB_1.videoDB.delVideo(newVideo.userId, newVideo.videoId)];
                    case 4:
                        _a.sent();
                        throw new Error('error in upload');
                    case 5: return [2 /*return*/, newVideo];
                }
            });
        });
    };
    VideoService.prototype.uservideo = function (Id, userId, videoId) {
        return __awaiter(this, void 0, void 0, function () {
            var video, isAccess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, videoDB_1.videoDB.getVideo(userId, videoId)];
                    case 1:
                        video = _a.sent();
                        if (!video) {
                            throw new Error_1.MyError('video not found', 404);
                        }
                        return [4 /*yield*/, shareDB_1.shareDB.checkAccess(Id, video.videoId)];
                    case 2:
                        isAccess = _a.sent();
                        if (!isAccess) {
                            throw new Error_1.MyError('video not found', 404);
                        }
                        return [2 /*return*/, video];
                }
            });
        });
    };
    VideoService.prototype.uservideos = function (Id, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var videos, accessVideos, index, isAccess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, videoDB_1.videoDB.getAllVideo(userId)];
                    case 1:
                        videos = _a.sent();
                        if (!videos) {
                            throw new Error_1.MyError('videos not found', 404);
                        }
                        accessVideos = [];
                        index = 0;
                        _a.label = 2;
                    case 2:
                        if (!(index < videos.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, shareDB_1.shareDB.checkAccess(Id, videos[index].videoId)];
                    case 3:
                        isAccess = _a.sent();
                        if (isAccess) {
                            accessVideos.push(videos[index]);
                        }
                        _a.label = 4;
                    case 4:
                        index++;
                        return [3 /*break*/, 2];
                    case 5:
                        if (!accessVideos.length) {
                            throw new Error_1.MyError('videos not found', 404);
                        }
                        return [2 /*return*/, accessVideos];
                }
            });
        });
    };
    VideoService.prototype.videos = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var videos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, videoDB_1.videoDB.getAllVideo(userId)];
                    case 1:
                        videos = _a.sent();
                        if (!videos.length) {
                            throw new Error_1.MyError('videos not found', 404);
                        }
                        return [2 /*return*/, videos];
                }
            });
        });
    };
    return VideoService;
}());
exports.videoService = new VideoService();
