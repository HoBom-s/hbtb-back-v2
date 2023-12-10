import { UserRepository } from "../repositories/user.repository";
import { TRole, TCreateUser, TUpdateUser } from "../types/user.type";
import { PossibleNull } from "../types/common.type";
import User from "../entities/user.entity";
import { CustomError } from "../middleware/error.middleware";
import bcrypt from "bcrypt";
import AuthHelper from "../helpers/auth.helper";
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

  async createUser(newUserInfo: TCreateUser): Promise<PossibleNull<User>> {
    const { nickname, password, profileImg, introduction } = newUserInfo;
    const foundUser = await this.findOneUserByNickname(nickname);
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
    const isPasswordCorrect = bcrypt.compare(password, hashedPassword);
    if (!isPasswordCorrect)
      throw new CustomError(400, "Please check password.");

    const userId = foundUser.id;
    const accessToken = this.authServcie.createAccessToken(userId);
    const refreshToken = this.authServcie.getRefreshToken(userId);

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
    // WIP
    return updatedUser;
  }
}

/*
(WIP) updateUser
1. updated info 반환하는 법 > save 사용?
https://stackoverflow.com/questions/47792808/typeorm-update-item-and-return-it

2. 비밀번호 업데이트 시 hashing
 */
