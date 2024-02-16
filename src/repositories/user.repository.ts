import { Repository } from "typeorm";
import { myDataSource } from "../data-source";
import User from "../entities/user.entity";
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

// WIP : remove unused check later
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

  // o
  async findOneUserByNickname(nickname: string): Promise<PossibleNull<User>> {
    const foundUser = await this.user.findOneBy({ nickname });
    if (!foundUser) return null;
    return foundUser;
  }

  // o
  async createUser(newUserInfo: TCreateUser): Promise<TUserWithoutPassword> {
    const { nickname, password, profileImg, introduction } = newUserInfo;

    const hashedPassword = bcrypt.hashSync(
      password,
      parseInt(process.env.SALT!),
    );

    const userInfo = {
      nickname,
      password: hashedPassword,
      profileImg,
      introduction,
    };
    const createdUser = this.user.create(userInfo);
    if (!createdUser) throw new CustomError(404, "Create user failed.");
    await this.user.save(createdUser);

    const createdUserWithoutPassword = await this.excludePassword(createdUser);

    return createdUserWithoutPassword;
  }

  // o
  async excludePassword(user: User) {
    const { password, ...restUserInfo } = user;
    return restUserInfo;
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
