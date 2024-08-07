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
exports.UserRepository = void 0;
const data_source_1 = require("../data-source");
const user_entity_1 = __importDefault(require("../entities/user.entity"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_middleware_1 = require("../middlewares/error.middleware");
class UserRepository {
    constructor() {
        this.user = data_source_1.myDataSource.getRepository(user_entity_1.default);
    }
    findOneUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield this.user.findOneBy({ id });
            if (!foundUser)
                throw new error_middleware_1.CustomError(404, "User not found.");
            return foundUser;
        });
    }
    findOneUserByNickname(nickname) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield this.user.findOneBy({ nickname });
            if (!foundUser)
                return null;
            return foundUser;
        });
    }
    createUser(createUserRequestDto, profileImgUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password } = createUserRequestDto;
            const hashedPassword = bcrypt_1.default.hashSync(password, parseInt(process.env.SALT));
            const newUserInfo = Object.assign(Object.assign({}, createUserRequestDto), { password: hashedPassword, profileImg: profileImgUrl });
            const createdUser = this.user.create(newUserInfo);
            if (!createdUser)
                throw new error_middleware_1.CustomError(404, "Create user failed.");
            yield this.user.save(createdUser);
            return createdUser;
        });
    }
    updateUser(id, updateUserRequestDto, profileImgUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const isPasswordUpdate = Object.keys(updateUserRequestDto).includes("password");
            if (isPasswordUpdate) {
                const password = updateUserRequestDto.password;
                const hashedPassword = bcrypt_1.default.hashSync(password, parseInt(process.env.SALT));
                updateUserRequestDto.password = hashedPassword;
            }
            updateUserRequestDto = profileImgUrl
                ? Object.assign(Object.assign({}, updateUserRequestDto), { profileImg: profileImgUrl }) : updateUserRequestDto;
            const updateResult = yield this.user.update(id, updateUserRequestDto);
            if (!updateResult.affected)
                throw new error_middleware_1.CustomError(404, "Update user failed: 0 affected.");
            return;
        });
    }
    removeUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteResult = yield this.user.delete(id);
            if (!deleteResult.affected)
                throw new error_middleware_1.CustomError(404, "Delete user failed: 0 affected.");
            return;
        });
    }
}
exports.UserRepository = UserRepository;
