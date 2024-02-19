import { UserRepository } from "../repositories/user.repository";
import {
  TRole,
  TCreateUser,
  TUpdateUser,
  TUserWithoutPassword,
  TUserWithPassword,
  TLoginUser,
} from "../types/user.type";
import { PossibleNull } from "../types/common.type";
import User from "../entities/user.entity";
import { CustomError } from "../middlewares/error.middleware";
import bcrypt from "bcrypt";
import { TTokens } from "../types/auth.type";
import AuthHelper from "../helpers/auth.helper";

export class UserService {
  private userRepository: UserRepository;
  private authHelper: AuthHelper;

  constructor() {
    this.userRepository = new UserRepository();
    this.authHelper = new AuthHelper();
  }

  async findOneUserByNicknameAndRole(
    nickname: string,
    role: TRole,
  ): Promise<PossibleNull<User>> {
    const foundUser = await this.userRepository.findOneUserByNicknameAndRole(
      nickname,
      role,
    );
    return foundUser;
  }

  async findOneUserById(
    id: string,
  ): Promise<PossibleNull<TUserWithoutPassword>> {
    const foundUser = await this.userRepository.findOneUserById(id);
    return foundUser;
  }

  async findOneUserByIdWithPassword(
    id: string,
  ): Promise<PossibleNull<TUserWithPassword>> {
    const foundUser = await this.userRepository.findOneUserByIdWithPassword(id);
    return foundUser;
  }

  async findOneUserByNickname(nickname: string): Promise<PossibleNull<User>> {
    const foundUser = await this.userRepository.findOneUserByNickname(nickname);
    return foundUser;
  }

  async createUser(newUserInfo: TCreateUser): Promise<TUserWithoutPassword> {
    const { nickname, ...restInfo } = newUserInfo;

    const foundUser = await this.userRepository.findOneUserByNickname(nickname);
    if (foundUser) {
      throw new CustomError(403, "User already exists.");
    }

    const createdUser = this.userRepository.createUser(newUserInfo);

    return createdUser;
  }

  async loginUser(loginInfo: TLoginUser): Promise<TTokens> {
    const { nickname, password } = loginInfo;

    const foundUser = await this.findOneUserByNickname(nickname);
    if (!foundUser) throw new CustomError(404, "User not found.");

    const hashedPassword = foundUser.password;
    const isPasswordCorrect = bcrypt.compareSync(password, hashedPassword);
    if (!isPasswordCorrect)
      throw new CustomError(400, "Please check password.");

    const userId = foundUser.id;

    const accessToken = this.authHelper.createToken(userId, "access");
    const refreshToken = this.authHelper.createToken(userId, "refresh");

    return { accessToken, refreshToken };
  }

  async updateUser(id: string, updates: TUpdateUser) {
    await this.findOneUserById(id);

    await this.userRepository.updateUser(id, updates);

    const updatedUserWithoutPassword = await this.findOneUserById(id);

    return updatedUserWithoutPassword;
  }

  async deleteUser(id: string) {
    await this.findOneUserById(id);

    return this.userRepository.deleteUser(id);
  }
}
