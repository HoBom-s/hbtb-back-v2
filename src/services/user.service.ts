import { UserRepository } from "../repositories/user.repository";
import { TRole, TCreateUser } from "../types/user";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async findOneUserByNicknameAndRole(nickname: string, role: TRole) {
    const foundUser = await this.userRepository.findOneUserByNicknameAndRole(
      nickname,
      role
    );
    return foundUser;
  }

  async findOneUserById(id: string) {
    const foundUser = await this.userRepository.findOneUserById(id);
    return foundUser;
  }

  async findOneUserByNickname(nickname: string) {
    const foundUser = await this.userRepository.findOneUserByNickname(nickname);
    return foundUser;
  }

  async createUser(newUserInfo: TCreateUser) {
    const { nickname, password, profileImg, introduction } = newUserInfo;
    const foundUser = await this.userRepository.findOneUserByNickname(nickname);
    if (foundUser) {
      // error handling middleware
      console.warn("해당 유저가 이미 존재합니다.");
      return;
    }
    const createdUser = this.userRepository.createUser(newUserInfo);
    return createdUser;
  }
}
