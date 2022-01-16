"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var winston_1 = require("winston");
exports.logger = (0, winston_1.createLogger)({
    format: winston_1.format.printf(function (info) {
        return "Error: ".concat(info.message);
    }),
    transports: [new winston_1.transports.File({ filename: 'app.log' })],
});
