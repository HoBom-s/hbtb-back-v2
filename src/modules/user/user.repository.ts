import { myDataSource } from "../../data-source";
import User from "./user.entity";
import { createUserDto } from "./dtos/createUser.dto";
import { v4 as uuid4 } from "uuid";

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

  async createUser(newUserInfo: createUserDto) {
    const id = uuid4();
    // id 추가
    const createdUser = user.create(newUserInfo);
    return createdUser;
  }
}

/*
loginUserRequest
updateUserRequest
deleteUserRequest
 */
