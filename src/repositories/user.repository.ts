import { Repository } from "typeorm";
import { myDataSource } from "../data-source";
import User from "../entities/user.entity";
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

  async createUser(
    createUserRequestDto: CreateUserRequestDto,
    profileImgUrl: string,
  ): Promise<User> {
    const { password } = createUserRequestDto;

    const hashedPassword = bcrypt.hashSync(
      password,
      parseInt(process.env.SALT!),
    );

    const newUserInfo = {
      ...createUserRequestDto,
      password: hashedPassword,
      profileImg: profileImgUrl,
    };

    const createdUser = this.user.create(newUserInfo);

    if (!createdUser) throw new CustomError(404, "Create user failed.");

    await this.user.save(createdUser);

    return createdUser;
  }

  async updateUser(
    id: string,
    updateUserRequestDto: UpdateUserRequestDto,
    profileImgUrl?: string,
  ) {
    const isPasswordUpdate =
      Object.keys(updateUserRequestDto).includes("password");

    if (isPasswordUpdate) {
      const password: string = updateUserRequestDto.password!;

      const hashedPassword = bcrypt.hashSync(
        password,
        parseInt(process.env.SALT!),
      );

      updateUserRequestDto.password = hashedPassword;
    }

    updateUserRequestDto = profileImgUrl
      ? { ...updateUserRequestDto, profileImg: profileImgUrl }
      : updateUserRequestDto;

    const updateResult = await this.user.update(id, updateUserRequestDto);

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
