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
const dto_util_1 = __importDefault(require("../utils/dto.util"));
const createUserRequest_dto_1 = __importDefault(require("../dtos/user/createUserRequest.dto"));
const response_util_1 = __importDefault(require("../utils/response.util"));
const loginUserRequest_dto_1 = __importDefault(require("../dtos/user/loginUserRequest.dto"));
const updateUserRequest_dto_1 = __importDefault(require("../dtos/user/updateUserRequest.dto"));
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
                return (0, response_util_1.default)(res, 200, "Get user info success.", {
                    foundUser,
                    reissuedAccessToken,
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
                const createUserRequestDto = yield (0, dto_util_1.default)(req.body, createUserRequest_dto_1.default);
                const profileImg = req.file;
                if (!createUserRequestDto)
                    throw new error_middleware_1.CustomError(400, "Error: Request body missing. Please provide the necessary data in the request body.");
                const createdUser = yield this.userService.createUser(createUserRequestDto, profileImg);
                return (0, response_util_1.default)(res, 201, "Create user success.", { createdUser });
            }
            catch (error) {
                next(error);
            }
        });
    }
    loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginUserRequestDto = yield (0, dto_util_1.default)(req.body, loginUserRequest_dto_1.default);
                if (!loginUserRequestDto)
                    throw new error_middleware_1.CustomError(400, "Error: Request body missing. Please provide the necessary data in the request body.");
                const { accessToken, refreshToken } = yield this.userService.loginUser(loginUserRequestDto);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    maxAge: 14 * 24 * 60 * 60 * 1000, // 14days
                });
                return (0, response_util_1.default)(res, 200, "Login success.", { accessToken });
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
                return (0, response_util_1.default)(res, 201, "Logout success.");
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
                const profileImg = req.file;
                const updateUserRequestDto = yield (0, dto_util_1.default)(req.body, updateUserRequest_dto_1.default);
                const updatedUser = yield this.userService.updateUser(id, updateUserRequestDto, profileImg);
                return (0, response_util_1.default)(res, 201, "User udate success.", {
                    updatedUser,
                    reissuedAccessToken,
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
                const { userId } = this.authHelper.validateAuthInfo(req.authInfo);
                if (id !== userId)
                    throw new error_middleware_1.CustomError(401, "Error: User not identical.");
                yield this.userService.removeUser(id);
                return (0, response_util_1.default)(res, 201, "Delete user success.");
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
