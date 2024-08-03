import { UserRepository } from "../repositories/user.repository";
import {
  TUpdateUser,
  TUserWithoutPassword,
  TLoginUser,
} from "../types/user.type";
import { CustomError } from "../middlewares/error.middleware";
import bcrypt from "bcrypt";
import { TTokens } from "../types/auth.type";
import AuthHelper from "../helpers/auth.helper";
import { TokenResponseDto } from "../dtos/user.dto";
import CreateUserRequestDto from "../dtos/user/createUserRequest.dto";
import UserResponseDto from "../dtos/user/userResponse.dto";

export class UserService {
  private userRepository: UserRepository;
  private authHelper: AuthHelper;

  constructor() {
    this.userRepository = new UserRepository();
    this.authHelper = new AuthHelper();
  }

  async createUser(
    createUserRequestDto: CreateUserRequestDto,
  ): Promise<TUserWithoutPassword> {
    const { nickname } = createUserRequestDto;

    const foundUser = await this.userRepository.findOneUserByNickname(nickname);

    if (foundUser) throw new CustomError(400, "User already exists.");

    const createdUser =
      await this.userRepository.createUser(createUserRequestDto);

    return UserResponseDto.from(createdUser);
  }

  // @TODO
  async loginUser(loginInfo: TLoginUser): Promise<TTokens> {
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

  async findOneUserById(id: string): Promise<TUserWithoutPassword> {
    const foundUser = await this.userRepository.findOneUserById(id);

    return UserResponseDto.from(foundUser);
  }

  async updateUser(
    id: string,
    updates: TUpdateUser,
  ): Promise<TUserWithoutPassword> {
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
