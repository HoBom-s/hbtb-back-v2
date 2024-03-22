"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenResponseDto = exports.UserWithoutPasswordResponseDto = void 0;
const common_dto_1 = __importDefault(require("./common.dto"));
class UserWithoutPasswordResponseDto extends common_dto_1.default {
    constructor(body) {
        super(body);
    }
    excludePassword() {
        const _a = this.body, { password } = _a, restInfo = __rest(_a, ["password"]);
        return restInfo;
    }
}
exports.UserWithoutPasswordResponseDto = UserWithoutPasswordResponseDto;
class TokenResponseDto extends common_dto_1.default {
    constructor(tokens) {
        super(tokens);
    }
}
exports.TokenResponseDto = TokenResponseDto;
