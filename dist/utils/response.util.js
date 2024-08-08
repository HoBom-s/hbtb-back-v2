"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseResponse_dto_1 = __importDefault(require("../dtos/common/baseResponse.dto"));
function sendResponse(res, statusCode, message, body) {
    const responseDto = new baseResponse_dto_1.default(statusCode, message, body);
    if (body) {
        return res.status(responseDto.statusCode).json(responseDto.toResponse());
    }
    return res
        .status(responseDto.statusCode)
        .setHeader("Content-Type", "application/json; charset=utf-8")
        .send(responseDto.message);
}
exports.default = sendResponse;
