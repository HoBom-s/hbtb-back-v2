import { UserRepository } from "../repositories/user.repository";
import {
  CreateUser,
  UpdateUser,
  UserWithoutPassword,
  LoginUser,
} from "../types/user.type";
import { CustomError } from "../middlewares/error.middleware";
import bcrypt from "bcrypt";
import { Tokens } from "../types/auth.type";
import AuthHelper from "../helpers/auth.helper";
import {
  TokenResponseDto,
  UserWithoutPasswordResponseDto,
} from "../dtos/user.dto";

export class UserService {
  private userRepository: UserRepository;
  private authHelper: AuthHelper;

  constructor() {
    this.userRepository = new UserRepository();
    this.authHelper = new AuthHelper();
  }

  async createUser(newUserInfo: CreateUser): Promise<UserWithoutPassword> {
    const { nickname, ...restInfo } = newUserInfo;

    const foundUser = await this.userRepository.findOneUserByNickname(nickname);
    if (foundUser) throw new CustomError(400, "User already exists.");

    const createdUser = await this.userRepository.createUser(newUserInfo);

    const createUserResponseDto = new UserWithoutPasswordResponseDto(
      createdUser,
    ).excludePassword();

    return createUserResponseDto;
  }

  async loginUser(loginInfo: LoginUser): Promise<Tokens> {
    const { nickname, password } = loginInfo;

    const foundUser = await this.userRepository.findOneUserByNickname(nickname);
    if (!foundUser) throw new CustomError(404, "User not found.");

    const hashedPassword = foundUser.password;
    const isPasswordCorrect = bcrypt.compareSync(password, hashedPassword);
    if (!isPasswordCorrect)
      throw new CustomError(400, "Please check the password again.");

    const userId = foundUser.id;

    const accessToken = this.authHelper.createToken(userId, "access");
    const refreshToken = this.authHelper.createToken(userId, "refresh");

    const tokens = { accessToken, refreshToken };

    const tokenResponseDto = new TokenResponseDto(tokens).toResponse();

    return tokenResponseDto;
  }

  async findOneUserById(id: string): Promise<UserWithoutPassword> {
    const foundUser = await this.userRepository.findOneUserById(id);

    const foundUserResponseDto = new UserWithoutPasswordResponseDto(
      foundUser,
    ).excludePassword();

    return foundUserResponseDto;
  }

  async updateUser(
    id: string,
    updates: UpdateUser,
  ): Promise<UserWithoutPassword> {
    await this.userRepository.findOneUserById(id);
    await this.userRepository.updateUser(id, updates);

    const updatedUser = await this.findOneUserById(id);

    return updatedUser;
  }

  async removeUser(id: string) {
    await this.findOneUserById(id);
    return this.userRepository.removeUser(id);
  }
}
