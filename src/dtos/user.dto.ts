import BaseResponseDto from "./base.response.dto";
import User from "../entities/user.entity";
import { TTokens } from "../types/auth.type";

export class UserWithoutPasswordResponseDto extends BaseResponseDto<User> {
  constructor(body: User) {
    super(body);
  }

  excludePassword() {
    const { password, ...restInfo } = this.body;
    return restInfo;
  }
}

export class TokenResponseDto extends BaseResponseDto<TTokens> {
  constructor(tokens: TTokens) {
    super(tokens);
  }
}
