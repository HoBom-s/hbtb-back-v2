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
import { AuthService } from "./auth.service";
import { TTokens } from "../types/auth.type";

// WIP : remove unused check later
export class UserService {
  private userRepository: UserRepository;
  private authServcie: AuthService;

  constructor() {
    this.userRepository = new UserRepository();
    this.authServcie = new AuthService();
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

  // o
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
    const accessToken = this.authServcie.createAccessToken(userId);
    const refreshToken = await this.authServcie.getRefreshToken(userId);

    // WIP
    return { accessToken, refreshToken };
  }

  async logoutUser(userId: string) {
    return this.authServcie.removeRefreshToken(userId);
  }

  async updateUser(id: string, updates: TUpdateUser) {
    const foundUser = await this.findOneUserById(id);
    if (!foundUser) throw new CustomError(400, "User not found");
    const updatedUser = await this.userRepository.updateUser(id, updates);
    return updatedUser;
  }

  async deleteUser(id: string) {
    const foundUser = await this.findOneUserById(id);
    if (!foundUser) throw new CustomError(400, "User not found");
    return this.userRepository.deleteUser(id);
  }
}
