import { UserRepository } from "../repositories/user.repository";
import {
  TCreateUser,
  TUpdateUser,
  TUserWithoutPassword,
  TLoginUser,
} from "../types/user.type";
import { CustomError } from "../middlewares/error.middleware";
import bcrypt from "bcrypt";
import { TTokens } from "../types/auth.type";
import AuthHelper from "../helpers/auth.helper";
import { PossibleNull } from "../types/common.type";
import User from "../entities/user.entity";

export class UserService {
  private userRepository: UserRepository;
  private authHelper: AuthHelper;

  constructor() {
    this.userRepository = new UserRepository();
    this.authHelper = new AuthHelper();
  }

  excludePassword(user: User): TUserWithoutPassword {
    const { password, ...restUserInfo } = user;
    return restUserInfo;
  }

  async createUser(newUserInfo: TCreateUser): Promise<TUserWithoutPassword> {
    const { nickname, ...restInfo } = newUserInfo;

    const foundUser = await this.userRepository.findOneUserByNickname(nickname);
    if (foundUser) {
      throw new CustomError(403, "User already exists.");
    }

    const createdUser = await this.userRepository.createUser(newUserInfo);

    const createdUserWithoutPassword = this.excludePassword(createdUser);

    return createdUserWithoutPassword;
  }

  async loginUser(loginInfo: TLoginUser): Promise<TTokens> {
    const { nickname, password } = loginInfo;

    const foundUser = await this.userRepository.findOneUserByNickname(nickname);
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

  async findOneUserById(id: string): Promise<TUserWithoutPassword> {
    const foundUser = await this.userRepository.findOneUserById(id);
    const userWithoutPassword = this.excludePassword(foundUser);

    return userWithoutPassword;
  }

  async updateUser(
    id: string,
    updates: TUpdateUser,
  ): Promise<TUserWithoutPassword> {
    await this.userRepository.findOneUserById(id);
    await this.userRepository.updateUser(id, updates);

    return this.findOneUserById(id);
  }

  async removeUser(id: string) {
    await this.findOneUserById(id);
    return this.userRepository.removeUser(id);
  }
}
