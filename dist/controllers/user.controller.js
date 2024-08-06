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
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const error_middleware_1 = require("../middlewares/error.middleware");
const auth_helper_1 = __importDefault(require("../helpers/auth.helper"));
class UserController {
    constructor() {
        this.userService = new user_service_1.UserService();
        this.authHelper = new auth_helper_1.default();
    }
    getUserInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, reissuedAccessToken } = this.authHelper.validateAuthInfo(req.authInfo);
                const foundUser = yield this.userService.findOneUserById(userId);
                return res.json({
                    status: 200,
                    message: "Get user info success.",
                    data: { foundUser, reissuedAccessToken },
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profileImg = req.file;
                const newUserInfo = req.body;
                if (!newUserInfo)
                    throw new error_middleware_1.CustomError(400, "Error: Request body missing. Please provide the necessary data in the request body.");
                const newUserInfoWithProfileImg = Object.assign({ profileImg }, newUserInfo);
                const createdUser = yield this.userService.createUser(newUserInfoWithProfileImg);
                return res.json({
                    status: 201,
                    message: "Create user success.",
                    data: { createdUser },
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginInfo = req.body;
                if (!loginInfo)
                    throw new error_middleware_1.CustomError(400, "Error: Request body missing. Please provide the necessary data in the request body.");
                const { accessToken, refreshToken } = yield this.userService.loginUser(loginInfo);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    maxAge: 14 * 24 * 60 * 60 * 1000, // 14days in milliseconds
                });
                return res.json({
                    status: 200,
                    message: "Login success.",
                    data: { accessToken },
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    logoutUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie("refreshToken", {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                });
                return res.json({
                    status: 201,
                    message: "Logout success.",
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { userId, reissuedAccessToken } = this.authHelper.validateAuthInfo(req.authInfo);
                if (id !== userId)
                    throw new error_middleware_1.CustomError(401, "Error: User not identical.");
                const updatedProfileImg = req.file;
                const updatedBody = req.body;
                const updatedInfo = Object.assign({ updatedProfileImg }, updatedBody);
                const updatedUser = yield this.userService.updateUser(id, updatedInfo);
                return res.json({
                    status: 201,
                    message: "User udate success.",
                    data: { updatedUser, reissuedAccessToken },
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    removeUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { userId, reissuedAccessToken } = this.authHelper.validateAuthInfo(req.authInfo);
                if (id !== userId)
                    throw new error_middleware_1.CustomError(401, "Error: User not identical.");
                yield this.userService.removeUser(id);
                return res.json({
                    status: 201,
                    message: "Delete user success",
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
