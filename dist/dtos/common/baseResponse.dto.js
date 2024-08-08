"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseResponseDto {
    constructor(statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message;
        if (data !== undefined) {
            this.data = data;
        }
    }
    toResponse() {
        return new BaseResponseDto(this.statusCode, this.message, this.data);
    }
}
exports.default = BaseResponseDto;
