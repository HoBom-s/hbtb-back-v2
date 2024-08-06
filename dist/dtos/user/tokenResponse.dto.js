"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TokenResponseDto {
    constructor(accessToken, refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
exports.default = TokenResponseDto;
