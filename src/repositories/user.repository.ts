import { Repository } from "typeorm";
import { myDataSource } from "../data-source";
import User from "../entities/user.entity";
import { v4 as uuid4 } from "uuid";
import {
  TRole,
  TCreateUser,
  TUpdateUser,
  TUserWithoutPassword,
} from "../types/user.type";
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

  async createUser(newUserInfo: TCreateUser): Promise<TUserWithoutPassword> {
    const { nickname, password, profileImg, introduction } = newUserInfo;
    const id = uuid4();
    const hashedPassword = bcrypt.hashSync(
      password,
      parseInt(process.env.SALT!)
    );
    const userInfo = {
      id,
      nickname,
      password: hashedPassword,
      profileImg,
      introduction,
    };
    await this.user.save(userInfo);
    const userWithoutPassword = await this.user
      .createQueryBuilder("user")
      .select([
        "user.id",
        "user.nickname",
        "user.profileImg",
        "user.introduction",
        "user.role",
        "user.createdAt",
        "user.updatedAt",
      ])
      .where({ id })
      .getOne();
    return userWithoutPassword!;
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

  async deleteUser(id: string) {
    return this.user.delete({ id });
  }
}
