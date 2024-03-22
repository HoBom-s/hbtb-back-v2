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
exports.UserService = void 0;
const user_repository_1 = require("../repositories/user.repository");
const error_middleware_1 = require("../middlewares/error.middleware");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_helper_1 = __importDefault(require("../helpers/auth.helper"));
const user_dto_1 = require("../dtos/user.dto");
const image_service_1 = require("./image.service");
class UserService {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
        this.authHelper = new auth_helper_1.default();
        this.imageService = new image_service_1.ImageService();
    }
    createUser(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nickname, profileImg } = userInfo, restInfo = __rest(userInfo, ["nickname", "profileImg"]);
            const foundUser = yield this.userRepository.findOneUserByNickname(nickname);
            if (foundUser)
                throw new error_middleware_1.CustomError(400, "User already exists.");
            let userInfoWithProfileImgUrl;
            if (!profileImg) {
                userInfoWithProfileImgUrl = Object.assign(Object.assign({}, userInfo), { profileImg: process.env.DEFAULT_PROFILE });
            }
            else {
                const profileImgUrl = yield this.imageService.uploadOneImage({ image: profileImg, uniqueString: nickname }, "profile");
                userInfoWithProfileImgUrl = Object.assign(Object.assign({}, userInfo), { profileImg: profileImgUrl });
            }
            const createdUser = yield this.userRepository.createUser(userInfoWithProfileImgUrl);
            const createUserResponseDto = new user_dto_1.UserWithoutPasswordResponseDto(createdUser).excludePassword();
            return createUserResponseDto;
        });
    }
    loginUser(loginInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nickname, password } = loginInfo;
            const foundUser = yield this.userRepository.findOneUserByNickname(nickname);
            if (!foundUser)
                throw new error_middleware_1.CustomError(404, "User not found.");
            const hashedPassword = foundUser.password;
            const isPasswordCorrect = bcrypt_1.default.compareSync(password, hashedPassword);
            if (!isPasswordCorrect)
                throw new error_middleware_1.CustomError(400, "Please check the password again.");
            const userId = foundUser.id;
            const accessToken = this.authHelper.createToken(userId, "access");
            const refreshToken = this.authHelper.createToken(userId, "refresh");
            const tokens = { accessToken, refreshToken };
            const tokenResponseDto = new user_dto_1.TokenResponseDto(tokens).toResponse();
            return tokenResponseDto;
        });
    }
    findOneUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield this.userRepository.findOneUserById(id);
            const foundUserResponseDto = new user_dto_1.UserWithoutPasswordResponseDto(foundUser).excludePassword();
            return foundUserResponseDto;
        });
    }
    updateUser(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield this.userRepository.findOneUserById(id);
            const { updatedProfileImg } = updates, updatedBodyInfo = __rest(updates, ["updatedProfileImg"]);
            if (!updatedProfileImg) {
                yield this.userRepository.updateUser(id, updatedBodyInfo);
            }
            else {
                const profileImgUrl = yield this.imageService.uploadOneImage({ image: updatedProfileImg, uniqueString: foundUser.nickname }, "profile");
                yield this.userRepository.updateUser(id, Object.assign({ profileImg: profileImgUrl }, updatedBodyInfo));
            }
            const updatedUser = yield this.findOneUserById(id);
            return updatedUser;
        });
    }
    removeUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield this.findOneUserById(id);
            const profileImgUrl = foundUser.profileImg;
            yield this.imageService.removeOneImage(profileImgUrl);
            return this.userRepository.removeUser(id);
        });
    }
}
exports.UserService = UserService;
