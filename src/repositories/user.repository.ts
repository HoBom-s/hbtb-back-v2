import { myDataSource } from "../data-source";
import User from "../entities/user.entity";
import { v4 as uuid4 } from "uuid";
import { TRole, TCreateUser } from "../types/user";

const user = myDataSource.getRepository(User);

export class UserRepository {
  async findOneUserByNicknameAndRole(nickname: string, role: TRole) {
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

  async createUser(newUserInfo: TCreateUser) {
    const id = uuid4();
    const userInfoWithId = { ...newUserInfo, id };
    const createdUser = user.create(userInfoWithId);
    return createdUser;
  }
}

/*
loginUserRequest
updateUserRequest
deleteUserRequest
 */
