import userRepository from "../repositories/user.repository";
import { TRole, TCreateUser } from "../types/user";

class UserService {
  async findOneUserByNicknameAndRole(nickname: string, role: TRole) {
    const foundUser = await userRepository.findOneUserByNicknameAndRole(
      nickname,
      role
    );
    return foundUser;
  }

  async findOneUserById(id: string) {
    const foundUser = await userRepository.findOneUserById(id);
    return foundUser;
  }

  async findOneUserByNickname(nickname: string) {
    const foundUser = await userRepository.findOneUserByNickname(nickname);
    return foundUser;
  }

  async createUser(newUserInfo: TCreateUser) {
    const { nickname, password, profileImg, introduction } = newUserInfo;
    const foundUser = await userRepository.findOneUserByNickname(nickname);
    if (foundUser) {
      // error handling middleware
      console.warn("해당 유저가 이미 존재합니다.");
      return;
    }
    const createdUser = userRepository.createUser(newUserInfo);
    return createdUser;
  }
}

const userService = new UserService();

export default userService;
