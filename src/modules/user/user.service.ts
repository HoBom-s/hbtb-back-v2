import { UserDto } from "./dto/user.dto";
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

  async createUser(newUserInfo: UserDto) {
    const createdUser = this.#userRepository.createUser(newUserInfo);
    return createdUser;
  }
}
