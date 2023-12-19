import { UserRepository } from "../repositories/UserRepository";
import {
  TRole,
  TCreateUser,
  TUpdateUser,
  TUserWithoutPassword,
} from "../types/user.type";
import { PossibleNull } from "../types/common.type";
import User from "../entities/user.entity";
import { CustomError } from "../middleware/error.middleware";
import bcrypt from "bcrypt";
import { AuthService } from "./auth.service";

export class UserService {
  private userRepository: UserRepository;
  private authServcie: AuthService;

  constructor() {
    this.userRepository = new UserRepository();
    this.authServcie = new AuthService();
  }

  async findOneUserByNicknameAndRole(
    nickname: string,
    role: TRole
  ): Promise<PossibleNull<User>> {
    const foundUser = await this.userRepository.findOneUserByNicknameAndRole(
      nickname,
      role
    );
    if (!foundUser) {
      throw new CustomError(400, "User does not exist.");
    }
    return foundUser;
  }

  async findOneUserById(id: string): Promise<PossibleNull<User>> {
    const foundUser = await this.userRepository.findOneUserById(id);
    if (!foundUser) {
      throw new CustomError(400, "User does not exist.");
    }
    return foundUser;
  }

  async findOneUserByNickname(nickname: string): Promise<PossibleNull<User>> {
    const foundUser = await this.userRepository.findOneUserByNickname(nickname);
    if (!foundUser) {
      throw new CustomError(400, "User does not exist.");
    }
    return foundUser;
  }

  async createUser(newUserInfo: TCreateUser): Promise<TUserWithoutPassword> {
    const { nickname, password, profileImg, introduction } = newUserInfo;
    const foundUser = await this.userRepository.findOneUserByNickname(nickname);
    if (foundUser) {
      throw new CustomError(400, "User already exists.");
    }
    const createdUser = this.userRepository.createUser(newUserInfo);
    return createdUser;
  }

  async loginUser(nickname: string, password: string) {
    const foundUser = await this.findOneUserByNickname(nickname);
    if (!foundUser) throw new CustomError(400, "User not found.");
    const hashedPassword = foundUser.password;
    const isPasswordCorrect = bcrypt.compareSync(password, hashedPassword);
    if (!isPasswordCorrect)
      throw new CustomError(400, "Please check password.");

    const userId = foundUser.id;
    const accessToken = this.authServcie.createAccessToken(userId);
    const refreshToken = await this.authServcie.getRefreshToken(userId);

    return { accessToken, refreshToken };
  }

  logoutUser(userId: string) {
    const foundUser = this.findOneUserById(userId);
    if (!foundUser) throw new CustomError(400, "User not found.");
    return this.authServcie.removeRefreshToken(userId);
  }

  async updateUser(id: string, updates: TUpdateUser) {
    const foundUser = await this.findOneUserById(id);
    if (!foundUser) throw new CustomError(400, "User not found");
    const updatedUser = this.userRepository.updateUser(id, updates);
    return updatedUser;
  }

  async deleteUser(id: string) {
    const foundUser = await this.findOneUserById(id);
    if (!foundUser) throw new CustomError(400, "User not found");
    return this.userRepository.deleteUser(id);
  }
}
