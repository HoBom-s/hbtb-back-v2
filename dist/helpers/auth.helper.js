"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const error_middleware_1 = require("../middlewares/error.middleware");
class AuthHelper {
    constructor() { }
    createToken(userId, tokenType) {
        const secretKey = this.getSecretKey(tokenType);
        const exp = this.getExp(tokenType);
        const token = jsonwebtoken_1.default.sign({ userId }, secretKey, {
            expiresIn: exp,
        });
        return token;
    }
    getUserIdFromToken(validToken, tokenType) {
        try {
            const secretKey = this.getSecretKey(tokenType);
            const decodedToken = jsonwebtoken_1.default.verify(validToken, secretKey);
            if (typeof decodedToken === "string")
                return false;
            return decodedToken.userId;
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                throw new error_middleware_1.CustomError(401, `Error: Get userId from ${tokenType} token failed.`);
            }
        }
    }
    verifyToken(token, tokenType) {
        try {
            const secretKey = this.getSecretKey(tokenType);
            const decodedToken = jsonwebtoken_1.default.verify(token, secretKey);
            if (typeof decodedToken === "string")
                return false;
            const currentTime = Math.floor(Date.now() / 1000);
            const tokenExpirationTime = decodedToken.exp;
            return tokenExpirationTime > currentTime;
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.TokenExpiredError)
                return null;
        }
    }
    getSecretKey(tokenType) {
        const secretKey = tokenType === "access"
            ? process.env.ACCESS_TOKEN_SECRET_KEY
            : process.env.REFRESH_TOKEN_SECRET_KEY;
        return secretKey;
    }
    getExp(tokenType) {
        const exp = tokenType === "access"
            ? process.env.ACCESS_TOKEN_EXPIRE_TIME
            : process.env.REFRESH_TOKEN_EXPIRE_TIME;
        return exp;
    }
    validateAuthInfo(authInfo) {
        if (!authInfo)
            throw new error_middleware_1.CustomError(401, "Error: request `authInfo` missing. Please provide valid userId or reissuedToken.");
        const { userId, reissuedAccessToken } = authInfo;
        if (!userId)
            throw new error_middleware_1.CustomError(401, "Error: userId missing in req.authInfo.");
        return { userId, reissuedAccessToken };
    }
}
exports.default = AuthHelper;
