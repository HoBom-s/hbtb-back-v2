import { myDataSource } from "../../data-source";
import User from "./user.entity";
import { UserDto } from "./dto/user.dto";

const user = myDataSource.getRepository(User);

export class UserRepository {
  async findOneUserByNicknameAndRole(nickname: string, role: "admin" | "user") {
    const foundUser = await user.findOneBy({ nickname, role });
    return foundUser;
  }

  async findOneUserById(id: string) {
    const foundUser = await user.findOneBy({ id });
    return foundUser;
  }

  async findOneUserByNickname(nickname: string) {
    const foundUser = await user.findOneBy({ nickname });
    return foundUser;
  }

  async createUser(newUserInfo: UserDto) {
    const createdUser = user.create(newUserInfo);
    return createdUser;
  }
}

/*
loginUserRequest
updateUserRequest
deleteUserRequest
 */
