import User from "../entities/user.entity";

export class BaseResponseDto<T> {
  body: T;

  constructor(body: T) {
    this.body = body;
  }

  toResponse() {
    return this.body;
  }
}

export class UserWithoutPasswordResponseDto extends BaseResponseDto<User> {
  constructor(body: User) {
    super(body);
  }

  excludePassword() {
    const { password, ...restInfo } = this.body;
    return restInfo;
  }
}
