import { Repository } from "typeorm";
import { myDataSource } from "../data-source";
import User from "../entities/user.entity";
import { CreateUserWithProfileImg, UpdateUser } from "../types/user.type";
import { PossibleNull } from "../types/common.type";
import bcrypt from "bcrypt";
import { CustomError } from "../middlewares/error.middleware";

export class UserRepository {
  private user: Repository<User>;

  constructor() {
    this.user = myDataSource.getRepository(User);
  }

  async findOneUserById(id: string): Promise<User> {
    const foundUser = await this.user.findOneBy({ id });
    if (!foundUser) throw new CustomError(404, "User not found.");

    return foundUser;
  }

  async findOneUserByNickname(nickname: string): Promise<PossibleNull<User>> {
    const foundUser = await this.user.findOneBy({ nickname });
    if (!foundUser) return null;

    return foundUser;
  }

  async createUser(newUserInfo: CreateUserWithProfileImg): Promise<User> {
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

    return createdUser;
  }

  async updateUser(id: string, updates: UpdateUser) {
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

  async removeUser(id: string) {
    const deleteResult = await this.user.delete(id);
    if (!deleteResult.affected)
      throw new CustomError(404, "Delete user failed: 0 affected.");

    return;
  }
}
