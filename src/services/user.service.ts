import { UserRepository } from "../repositories/user.repository";
import { TRole, TCreateUser } from "../types/user.type";
import { PossibleNull } from "../types/common.type";
import User from "../entities/user.entity";
import { CustomError } from "../middleware/error.middleware";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthHelper from "../helpers/auth.helper";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
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
      throw new CustomError(400, "해당 유저가 존재하지 않습니다.");
    }
    return foundUser;
  }

  async findOneUserById(id: string): Promise<PossibleNull<User>> {
    const foundUser = await this.userRepository.findOneUserById(id);
    if (!foundUser) {
      throw new CustomError(400, "해당 유저가 존재하지 않습니다.");
    }
    return foundUser;
  }

  async findOneUserByNickname(nickname: string): Promise<PossibleNull<User>> {
    const foundUser = await this.userRepository.findOneUserByNickname(nickname);
    if (!foundUser) {
      throw new CustomError(400, "해당 유저가 존재하지 않습니다.");
    }
    return foundUser;
  }

  async createUser(newUserInfo: TCreateUser): Promise<PossibleNull<User>> {
    const { nickname, password, profileImg, introduction } = newUserInfo;
    const foundUser = await this.userRepository.findOneUserByNickname(nickname);
    if (foundUser) {
      throw new CustomError(400, "해당 유저가 이미 존재합니다.");
    }
    const createdUser = this.userRepository.createUser(newUserInfo);
    return createdUser;
  }

  async loginUser(nickname: string, password: string) {
    const foundUser = await this.findOneUserByNickname(nickname);
    if (!foundUser)
      throw new CustomError(400, "해당 유저가 존재하지 않습니다.");
    const hashedPassword = foundUser.password;
    const isPasswordCorrect = bcrypt.compare(password, hashedPassword);
    if (!isPasswordCorrect)
      throw new CustomError(400, "비밀번호를 확인해주세요.");

    const id = foundUser.id;
    const authHelper = new AuthHelper();
    const accessToken = authHelper.createAccessToken(id);
    const refreshToken = authHelper.createRefreshToken(id);

    return { accessToken, refreshToken };
  }
}
