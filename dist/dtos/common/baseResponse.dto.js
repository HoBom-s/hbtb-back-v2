"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseResponseDto {
    constructor(statusCode, message, body) {
        this.statusCode = statusCode;
        this.message = message;
        if (body !== undefined) {
            this.body = body;
        }
    }
    toResponse() {
        return new BaseResponseDto(this.statusCode, this.message, this.body);
    }
}
exports.default = BaseResponseDto;
