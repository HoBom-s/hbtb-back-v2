import { createUserDto } from "./dtos/createUser.dto";
import { UserRepository } from "./user.repository";

export class UserService {
  #userRepository: UserRepository;

  async findOneUserByNicknameAndRole(nickname: string, role: "admin" | "user") {
    const foundUser = await this.#userRepository.findOneUserByNicknameAndRole(
      nickname,
      role
    );
    return foundUser;
  }

  async findOneUserById(id: string) {
    const foundUser = await this.#userRepository.findOneUserById(id);
    return foundUser;
  }

  async findOneUserByNickname(nickname: string) {
    const foundUser = await this.#userRepository.findOneUserByNickname(
      nickname
    );
  }

  async createUser(newUserInfo: createUserDto) {
    const { nickname, password, profileImg, role, introduction } = newUserInfo;
    const foundUser = await this.#userRepository.findOneUserByNickname(
      nickname
    );
    if (foundUser) {
      // error handling middleware
      console.warn("해당 유저가 이미 존재합니다.");
      return;
    }
    const createdUser = this.#userRepository.createUser(newUserInfo);
    return createdUser;
  }
}
