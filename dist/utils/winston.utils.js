"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const { combine, timestamp, label, printf } = winston_1.format;
const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
const logDir = __dirname + "/../../logs";
function dailyOptions(level) {
    return {
        level,
        datePattern: "YYYY-MM-DD",
        dirname: logDir + `/${level}`,
        filename: `%DATE%.${level}.log`,
        maxFiles: 30,
        zippedArchive: true,
    };
}
const winstonLogger = (0, winston_1.createLogger)({
    format: combine(label({ label: "Hobom-TechBlog" }), timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
    }), logFormat),
    transports: [new winston_daily_rotate_file_1.default(dailyOptions("info"))],
});
exports.default = winstonLogger;
