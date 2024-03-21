"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseResponseDto {
    constructor(body) {
        this.body = body;
    }
    toResponse() {
        return this.body;
    }
}
exports.default = BaseResponseDto;
