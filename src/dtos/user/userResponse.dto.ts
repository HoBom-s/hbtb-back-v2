import User from "../../entities/user.entity";

class UserResponseDto {
  body: User;

  constructor(body: User) {
    this.body = body;
  }

  public static from(body: User) {
    const { password, ...restInfo } = body;

    return restInfo;
  }
}

export default UserResponseDto;
