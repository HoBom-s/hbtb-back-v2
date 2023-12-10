import { Repository } from "typeorm";
import { myDataSource } from "../data-source";
import User from "../entities/user.entity";
import { v4 as uuid4 } from "uuid";
import { TRole, TCreateUser, TUpdateUser } from "../types/user.type";
import { PossibleNull } from "../types/common.type";
import bcrypt from "bcrypt";

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
    const { nickname, password, profileImg, introduction } = newUserInfo;
    const id = uuid4();
    const hashedPassword = bcrypt.hashSync(password, process.env.SALT!);
    const userInfo = { id, nickname, hashedPassword, profileImg, introduction };
    const createdUser = this.user.create(userInfo);
    return createdUser;
  }

  async updateUser(id: string, updates: TUpdateUser) {
    const isPasswordUpdate = Object.keys(updates).includes("password");
    if (isPasswordUpdate) {
      const password: string = updates.password!;
      const hashedPassword = bcrypt.hashSync(password, process.env.SALT!);
      updates.password = hashedPassword;
    }
    const updatedUser = await this.user.save(updates);
    return updatedUser;
  }
}
