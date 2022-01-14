"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var posix_1 = __importDefault(require("path/posix"));
var tokenDB_1 = require("./User/DB/tokenDB");
function tokenVerify(req, res, next) {
    var _a = req.headers.authorization.split(' '), token = _a[1];
    if (!token) {
        return res.status(403).json('user not registred');
    }
    var payload = tokenDB_1.tokenDB.validateAccessToken(token);
    if (!payload) {
        return res.status(400).json({ message: "this token isn't valid" });
    }
    req.user = { userId: payload.userId };
    next();
}
exports.tokenVerify = tokenVerify;
exports.upload = multer_1.default({
    dest: './uploads/',
    fileFilter: function (req, file, cb) {
        var ext = posix_1.default.extname(file.originalname);
        if (ext === '.mp4' || ext === '.3gp' || ext === '.mov' || ext === '.webm') {
            cb(null, true);
        }
        else {
            cb(null, false);
        }
    },
});
