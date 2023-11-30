import { UserRepository } from "../repositories/user.repository";
import { TRole, TCreateUser } from "../types/user.type";
import { PossibleNull } from "../types/common.type";
import User from "../entities/user.entity";
import { CustomError } from "../middleware/error.middleware";

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
}
