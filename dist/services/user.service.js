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
exports.UserService = void 0;
const user_repository_1 = require("../repositories/user.repository");
const error_middleware_1 = require("../middlewares/error.middleware");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_helper_1 = __importDefault(require("../helpers/auth.helper"));
const tokenResponse_dto_1 = __importDefault(require("../dtos/user/tokenResponse.dto"));
const userResponse_dto_1 = __importDefault(require("../dtos/user/userResponse.dto"));
const image_service_1 = require("./image.service");
class UserService {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
        this.authHelper = new auth_helper_1.default();
        this.imageService = new image_service_1.ImageService();
    }
    createUser(createUserRequestDto, profileImg) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nickname } = createUserRequestDto;
            const foundUser = yield this.userRepository.findOneUserByNickname(nickname);
            if (foundUser)
                throw new error_middleware_1.CustomError(400, "User already exists.");
            let profileImgUrl;
            if (profileImg) {
                profileImgUrl = yield this.imageService.uploadOneImage({ image: profileImg, uniqueString: nickname }, "profile");
            }
            else {
                profileImgUrl = process.env.DEFAULT_PROFILE;
            }
            const createdUser = yield this.userRepository.createUser(createUserRequestDto, profileImgUrl);
            return userResponse_dto_1.default.from(createdUser);
        });
    }
    loginUser(loginUserRequestDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nickname, password } = loginUserRequestDto;
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
            return new tokenResponse_dto_1.default(accessToken, refreshToken);
        });
    }
    findOneUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield this.userRepository.findOneUserById(id);
            return userResponse_dto_1.default.from(foundUser);
        });
    }
    updateUser(id, updateUserRequestDto, profileImg) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield this.userRepository.findOneUserById(id);
            if (profileImg) {
                const profileImgUrl = yield this.imageService.uploadOneImage({ image: profileImg, uniqueString: foundUser.nickname }, "profile");
                yield this.userRepository.updateUser(id, updateUserRequestDto, profileImgUrl);
            }
            else {
                yield this.userRepository.updateUser(id, updateUserRequestDto);
            }
            return this.findOneUserById(id);
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
