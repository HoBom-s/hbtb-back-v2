import { UserRepository } from "../repositories/user.repository";
import { TUserWithoutPassword } from "../types/user.type";
import { CustomError } from "../middlewares/error.middleware";
import bcrypt from "bcrypt";
import AuthHelper from "../helpers/auth.helper";
import TokenResponseDto from "../dtos/user/tokenResponse.dto";
import CreateUserRequestDto from "../dtos/user/createUserRequest.dto";
import UserResponseDto from "../dtos/user/userResponse.dto";
import LoginUserRequestDto from "../dtos/user/loginUserRequest.dto";
import UpdateUserRequestDto from "../dtos/user/updateUserRequest.dto";

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

  async loginUser(
    loginUserRequestDto: LoginUserRequestDto,
  ): Promise<TokenResponseDto> {
    const { nickname, password } = loginUserRequestDto;

    const foundUser = await this.userRepository.findOneUserByNickname(nickname);

    if (!foundUser) throw new CustomError(404, "User not found.");

    const hashedPassword = foundUser.password;

    const isPasswordCorrect = bcrypt.compareSync(password, hashedPassword);

    if (!isPasswordCorrect)
      throw new CustomError(400, "Please check the password again.");

    const userId = foundUser.id;

    const accessToken = this.authHelper.createToken(userId, "access");
    const refreshToken = this.authHelper.createToken(userId, "refresh");

    return new TokenResponseDto(accessToken, refreshToken).toResponse();
  }

  async findOneUserById(id: string): Promise<TUserWithoutPassword> {
    const foundUser = await this.userRepository.findOneUserById(id);

    return UserResponseDto.from(foundUser);
  }

  async updateUser(
    id: string,
    updateUserREquestDto: UpdateUserRequestDto,
  ): Promise<TUserWithoutPassword> {
    await this.userRepository.findOneUserById(id);

    await this.userRepository.updateUser(id, updateUserREquestDto);

    return this.findOneUserById(id);
  }

  async removeUser(id: string) {
    await this.findOneUserById(id);

    return this.userRepository.removeUser(id);
  }
}
