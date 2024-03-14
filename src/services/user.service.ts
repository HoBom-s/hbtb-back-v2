import { UserRepository } from "../repositories/user.repository";
import {
  UserWithoutPassword,
  LoginUser,
  CreateUserWithProfileImg,
  CreateUserWithProfileImgUrl,
  UpdateUserWithProfileImg,
} from "../types/user.type";
import { CustomError } from "../middlewares/error.middleware";
import bcrypt from "bcrypt";
import { Tokens } from "../types/auth.type";
import AuthHelper from "../helpers/auth.helper";
import {
  TokenResponseDto,
  UserWithoutPasswordResponseDto,
} from "../dtos/user.dto";
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
    userInfo: CreateUserWithProfileImg,
  ): Promise<UserWithoutPassword> {
    const { nickname, profileImg, ...restInfo } = userInfo;

    const foundUser = await this.userRepository.findOneUserByNickname(nickname);
    if (foundUser) throw new CustomError(400, "User already exists.");

    let userInfoWithProfileImgUrl: CreateUserWithProfileImgUrl;
    if (!profileImg) {
      userInfoWithProfileImgUrl = {
        ...userInfo,
        profileImg: process.env.DEFAULT_PROFILE as string,
      };
    } else {
      const profileImgUrl = await this.imageService.uploadOneImage(
        { image: profileImg, uniqueString: nickname },
        "profile",
      );
      userInfoWithProfileImgUrl = {
        ...userInfo,
        profileImg: profileImgUrl,
      };
    }

    const createdUser = await this.userRepository.createUser(
      userInfoWithProfileImgUrl,
    );

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
    updates: UpdateUserWithProfileImg,
  ): Promise<UserWithoutPassword> {
    const foundUser = await this.userRepository.findOneUserById(id);

    const { updatedProfileImg, ...updatedBodyInfo } = updates;

    if (!updatedProfileImg) {
      await this.userRepository.updateUser(id, updatedBodyInfo);
    } else {
      const profileImgUrl = await this.imageService.uploadOneImage(
        { image: updatedProfileImg, uniqueString: foundUser.nickname },
        "profile",
      );
      await this.userRepository.updateUser(id, {
        profileImg: profileImgUrl,
        ...updatedBodyInfo,
      });
    }

    const updatedUser = await this.findOneUserById(id);

    return updatedUser;
  }

  async removeUser(id: string) {
    const foundUser = await this.findOneUserById(id);
    const profileImgUrl = foundUser.profileImg;

    await this.imageService.removeOneImage(profileImgUrl);

    return this.userRepository.removeUser(id);
  }
}
