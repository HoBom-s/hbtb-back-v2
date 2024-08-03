import { Repository } from "typeorm";
import { myDataSource } from "../data-source";
import User from "../entities/user.entity";
import { TUpdateUser } from "../types/user.type";
import { PossibleNull } from "../types/common.type";
import bcrypt from "bcrypt";
import { CustomError } from "../middlewares/error.middleware";
import CreateUserRequestDto from "../dtos/user/createUserRequest.dto";
import UpdateUserRequestDto from "../dtos/user/updateUserRequest.dto";

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

  async createUser(createUserRequestDto: CreateUserRequestDto): Promise<User> {
    const { nickname, password, profileImg, introduction } =
      createUserRequestDto;

    const hashedPassword = bcrypt.hashSync(
      password,
      parseInt(process.env.SALT!),
    );

    const newUserInfoWithHashedPassword = {
      nickname,
      password: hashedPassword,
      profileImg,
      introduction,
    };

    const createdUser = this.user.create(newUserInfoWithHashedPassword);

    if (!createdUser) throw new CustomError(404, "Create user failed.");

    await this.user.save(createdUser);

    return createdUser;
  }

  async updateUser(id: string, updateUserREquestDto: UpdateUserRequestDto) {
    const isPasswordUpdate =
      Object.keys(updateUserREquestDto).includes("password");

    if (isPasswordUpdate) {
      const password: string = updateUserREquestDto.password!;

      const hashedPassword = bcrypt.hashSync(
        password,
        parseInt(process.env.SALT!),
      );

      updateUserREquestDto.password = hashedPassword;
    }

    const updateResult = await this.user.update(id, updateUserREquestDto);

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
