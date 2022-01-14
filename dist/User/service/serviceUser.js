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
var bcrypt_1 = require("bcrypt");
var Error_1 = require("../../Error");
var tokenDB_1 = require("../DB/tokenDB");
var userDB_1 = require("../DB/userDB");
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var isUser, isPassewCompare, tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userDB_1.userDB.getUser(email)];
                    case 1:
                        isUser = _a.sent();
                        if (!isUser) {
                            throw new Error_1.MyError('login or password uncorrectly', 401);
                        }
                        return [4 /*yield*/, bcrypt_1.compare(password, isUser.password)];
                    case 2:
                        isPassewCompare = _a.sent();
                        if (!isPassewCompare) {
                            throw new Error_1.MyError('login or password uncorrectly', 401);
                        }
                        tokens = tokenDB_1.tokenDB.generateToken({ userId: isUser.id });
                        return [4 /*yield*/, tokenDB_1.tokenDB.saveToken(isUser.id, tokens.refreshToken)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, tokens];
                }
            });
        });
    };
    UserService.prototype.logout = function (refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tokenDB_1.tokenDB.removeToken(refreshToken)];
                    case 1:
                        payload = _a.sent();
                        if (!payload) {
                            throw new Error_1.MyError('refreshToken is not verify', 401);
                        }
                        return [2 /*return*/, payload];
                }
            });
        });
    };
    UserService.prototype.refresh = function (refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, existInDB, tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!refreshToken) {
                            throw new Error_1.MyError('this refreshToken is undefined...', 401);
                        }
                        payload = tokenDB_1.tokenDB.validateRefreshToken(refreshToken);
                        return [4 /*yield*/, tokenDB_1.tokenDB.existRefreshToken(refreshToken)];
                    case 1:
                        existInDB = _a.sent();
                        if (!existInDB || !payload) {
                            throw new Error_1.MyError('refreshToken is not verify', 401);
                        }
                        tokens = tokenDB_1.tokenDB.generateToken({ userId: payload.userId });
                        return [4 /*yield*/, tokenDB_1.tokenDB.saveToken(payload.userId, tokens.refreshToken)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, tokens];
                }
            });
        });
    };
    UserService.prototype.registration = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var isUser, hashPassword, newUser, tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userDB_1.userDB.getUser(email)];
                    case 1:
                        isUser = _a.sent();
                        if (isUser) {
                            throw new Error_1.MyError('this user exist in system...', 401);
                        }
                        return [4 /*yield*/, bcrypt_1.hash(password, 3)];
                    case 2:
                        hashPassword = _a.sent();
                        return [4 /*yield*/, userDB_1.userDB.addUser(email, hashPassword)];
                    case 3:
                        newUser = _a.sent();
                        tokens = tokenDB_1.tokenDB.generateToken({ userId: newUser.id });
                        return [4 /*yield*/, tokenDB_1.tokenDB.saveToken(newUser.id, tokens.refreshToken)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, tokens];
                }
            });
        });
    };
    return UserService;
}());
exports.serviceUser = new UserService();
