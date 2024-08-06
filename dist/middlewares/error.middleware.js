"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.CustomError = CustomError;
function errorMiddleware(err, req, res, next) {
    const { statusCode, message } = err;
    res.json({
        status: "Error",
        statusCode,
        message,
    });
    next();
}
exports.errorMiddleware = errorMiddleware;
