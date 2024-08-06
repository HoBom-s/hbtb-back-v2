"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_middleware_1 = require("./error.middleware");
const auth_helper_1 = __importDefault(require("../helpers/auth.helper"));
const authHelper = new auth_helper_1.default();
function authValidateMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader)
                throw new error_middleware_1.CustomError(401, "Error: Authorization header missing. Please include the 'Authorization' header with valid authentication credentials.");
            const isBearerExists = authHeader.startsWith("Bearer");
            if (!isBearerExists)
                throw new error_middleware_1.CustomError(401, "Error: `Bearer` missing in Authorization header.");
            const accessToken = authHeader.split(" ")[1];
            const refreshToken = req.cookies.refreshToken;
            const isAccessTokenValid = authHelper.verifyToken(accessToken, "access");
            const isRefreshTokenValid = authHelper.verifyToken(refreshToken, "refresh");
            if (!isAccessTokenValid && !isRefreshTokenValid) {
                throw new error_middleware_1.CustomError(401, "Error: Access and Refresh tokens both expired. Please login again to continue accessing the resources.");
            }
            if (!isAccessTokenValid) {
                const userId = authHelper.getUserIdFromToken(refreshToken, "refresh");
                const reissuedAccessToken = authHelper.createToken(userId, "access");
                req.authInfo = { userId, reissuedAccessToken };
                next();
                return;
            }
            const userId = authHelper.getUserIdFromToken(accessToken, "access");
            req.authInfo = { userId };
            next();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = authValidateMiddleware;
