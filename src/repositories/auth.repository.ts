import Auth from "../entities/auth.entity";
import { myDataSource } from "../data-source";
import { Repository } from "typeorm";
import AuthHelper from "../helpers/auth.helper";
import { v4 as uuid4 } from "uuid";

export class AuthRepository {
  private auth: Repository<Auth>;
  private authHelper: AuthHelper;

  constructor() {
    this.auth = myDataSource.getRepository(Auth);
    this.authHelper = new AuthHelper();
  }

  createAndSaveRefreshToken(userId: string) {
    const createdRefreshToken = this.authHelper.createRefreshToken(userId);
    this.auth.create({
      id: uuid4(),
      userId,
      refreshToken: createdRefreshToken,
    });
    return createdRefreshToken;
  }

  async getExistingRefreshToken(userId: string) {
    const foundRefreshToken = this.auth.findOneBy({ userId });
    if (!foundRefreshToken) this.createAndSaveRefreshToken(userId);
    // 이미 refresh토큰 있을 시, 유효여부 확인 -> auth helper
  }
}

/**
 * 1. 발급: helper
 * 2. 저장: repo
 * 3. 폐기: repo
 * 4. 비교: helper
 * 5. 유효여부: helper
 */
