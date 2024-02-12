import { Repository } from "typeorm";
import { myDataSource } from "../data-source";
import User from "../entities/user.entity";
import { v4 as uuid4 } from "uuid";
import {
  TRole,
  TCreateUser,
  TUpdateUser,
  TUserWithoutPassword,
  TUserWithPassword,
} from "../types/user.type";
import { PossibleNull } from "../types/common.type";
import bcrypt from "bcrypt";
import { CustomError } from "../middlewares/error.middleware";

export class UserRepository {
  private user: Repository<User>;

  constructor() {
    this.user = myDataSource.getRepository(User);
  }

  async findOneUserByNicknameAndRole(
    nickname: string,
    role: TRole,
  ): Promise<PossibleNull<User>> {
    const foundUser = await this.user.findOneBy({ nickname, role });
    if (!foundUser) {
      throw new CustomError(400, "User does not exist.");
    }
    return foundUser;
  }

  async findOneUserById(
    id: string,
  ): Promise<PossibleNull<TUserWithoutPassword>> {
    const userWithoutPassword = await this.excludePassword(id);
    if (!userWithoutPassword) {
      throw new CustomError(400, "User does not exist.");
    }
    return userWithoutPassword;
  }

  async findOneUserByIdWithPassword(
    id: string,
  ): Promise<PossibleNull<TUserWithPassword>> {
    const userWithPassword = await this.user.findOneBy({ id });
    return userWithPassword;
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
      parseInt(process.env.SALT!),
    );
    const userInfo = {
      id,
      nickname,
      password: hashedPassword,
      profileImg,
      introduction,
    };
    await this.user.save(userInfo);
    const userWithoutPassword = await this.excludePassword(id);
    return userWithoutPassword!;
  }

  async excludePassword(id: string) {
    return this.user
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
  }

  async updateUser(id: string, updates: TUpdateUser) {
    const isPasswordUpdate = Object.keys(updates).includes("password");
    if (isPasswordUpdate) {
      const password: string = updates.password!;
      const hashedPassword = bcrypt.hashSync(
        password,
        parseInt(process.env.SALT!),
      );
      updates.password = hashedPassword;
    }
    await this.user.update(id, updates);
    const updatedUserWithoutPassword = await this.excludePassword(id);
    return updatedUserWithoutPassword;
  }

  async deleteUser(id: string) {
    return this.user.delete({ id });
  }
}
