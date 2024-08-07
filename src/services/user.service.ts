import { UserRepository } from "../repositories/user.repository";
import { CustomError } from "../middlewares/error.middleware";
import bcrypt from "bcrypt";
import AuthHelper from "../helpers/auth.helper";
import TokenResponseDto from "../dtos/user/tokenResponse.dto";
import CreateUserRequestDto from "../dtos/user/createUserRequest.dto";
import UserResponseDto from "../dtos/user/userResponse.dto";
import LoginUserRequestDto from "../dtos/user/loginUserRequest.dto";
import UpdateUserRequestDto from "../dtos/user/updateUserRequest.dto";
import { MulterFile } from "../types/image.type";
import { UserWithoutPassword } from "../types/user.type";
import { ImageService } from "./image.service";

export class UserService {
  private userRepository: UserRepository;

  private authHelper: AuthHelper;
  private imageService: ImageService;

  constructor() {
    this.userRepository = new UserRepository();
    this.authHelper = new AuthHelper();
    this.imageService = new ImageService();
  }

  async createUser(
    createUserRequestDto: CreateUserRequestDto,
    profileImg: MulterFile,
  ): Promise<UserWithoutPassword> {
    const { nickname } = createUserRequestDto;

    const foundUser = await this.userRepository.findOneUserByNickname(nickname);

    if (foundUser) throw new CustomError(400, "User already exists.");

    let profileImgUrl;

    if (profileImg) {
      profileImgUrl = await this.imageService.uploadOneImage(
        { image: profileImg, uniqueString: nickname },
        "profile",
      );
    } else {
      profileImgUrl = process.env.DEFAULT_PROFILE as string;
    }

    const createdUser = await this.userRepository.createUser(
      createUserRequestDto,
      profileImgUrl,
    );

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

    return new TokenResponseDto(accessToken, refreshToken);
  }

  async findOneUserById(id: string): Promise<UserWithoutPassword> {
    const foundUser = await this.userRepository.findOneUserById(id);

    return UserResponseDto.from(foundUser);
  }

  async updateUser(
    id: string,
    updateUserRequestDto: UpdateUserRequestDto,
    profileImg: MulterFile,
  ): Promise<UserWithoutPassword> {
    const foundUser = await this.userRepository.findOneUserById(id);

    if (profileImg) {
      const profileImgUrl = await this.imageService.uploadOneImage(
        { image: profileImg, uniqueString: foundUser.nickname },
        "profile",
      );

      await this.userRepository.updateUser(
        id,
        updateUserRequestDto,
        profileImgUrl,
      );
    } else {
      await this.userRepository.updateUser(id, updateUserRequestDto);
    }

    return this.findOneUserById(id);
  }

  async removeUser(id: string) {
    const foundUser = await this.findOneUserById(id);

    const profileImgUrl = foundUser.profileImg;

    await this.imageService.removeOneImage(profileImgUrl);

    return this.userRepository.removeUser(id);
  }
}
