import { Repository, UpdateResult } from "typeorm";
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
    const foundUser = await this.user.findOneBy({ id });
    if (!foundUser) throw new CustomError(404, "User not found");

    const userWithoutPassword = await this.excludePassword(foundUser);

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

    const updateResult = await this.user.update(id, updates);
    if (!updateResult.affected)
      throw new CustomError(404, "Update user failed: 0 affected.");

    return;
  }

  removeUser(id: string) {
    return this.user.delete(id);
  }
}
