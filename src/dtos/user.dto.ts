import BaseResponseDto from "./common.dto";
import User from "../entities/user.entity";
import { Tokens } from "../types/auth.type";

export class UserWithoutPasswordResponseDto extends BaseResponseDto<User> {
  constructor(body: User) {
    super(body);
  }

  excludePassword() {
    const { password, ...restInfo } = this.body;
    return restInfo;
  }
}

export class TokenResponseDto extends BaseResponseDto<Tokens> {
  constructor(tokens: Tokens) {
    super(tokens);
  }
}
