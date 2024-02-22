import BaseResponseDto from "./common.dto";
import User from "../entities/user.entity";

export class UserWithoutPasswordResponseDto extends BaseResponseDto<User> {
  constructor(body: User) {
    super(body);
  }

  excludePassword() {
    const { password, ...restInfo } = this.body;
    return restInfo;
  }
}
