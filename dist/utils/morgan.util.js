"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const winston_utils_1 = __importDefault(require("./winston.utils"));
const morganHandler = (0, morgan_1.default)("combined", {
    stream: { write: (message) => winston_utils_1.default.info(message.trim()) },
});
exports.default = morganHandler;
