import { Repository } from "typeorm";
import { myDataSource } from "../data-source";
import User from "../entities/user.entity";
import { v4 as uuid4 } from "uuid";
import { TRole, TCreateUser } from "../types/user.type";
import { PossibleNull } from "../types/common.type";

export class UserRepository {
  private user: Repository<User>;

  constructor() {
    this.user = myDataSource.getRepository(User);
  }

  async findOneUserByNicknameAndRole(
    nickname: string,
    role: TRole
  ): Promise<PossibleNull<User>> {
    const foundUser = await this.user.findOneBy({ nickname, role });
    return foundUser;
  }

  async findOneUserById(id: string): Promise<PossibleNull<User>> {
    const foundUser = await this.user.findOneBy({ id });
    return foundUser;
  }

  async findOneUserByNickname(nickname: string): Promise<PossibleNull<User>> {
    const foundUser = await this.user.findOneBy({ nickname });
    return foundUser;
  }

  async createUser(newUserInfo: TCreateUser): Promise<User> {
    const id = uuid4();
    const userInfoWithId = { ...newUserInfo, id };
    const createdUser = this.user.create(userInfoWithId);
    return createdUser;
  }
}

/*
loginUserRequest
updateUserRequest
deleteUserRequest
 */
