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

  async getRefreshToken(userId: string) {
    const foundRefreshToken = await this.auth.findOneBy({ userId });
    if (!foundRefreshToken) {
      const createdRefreshToken = this.createAndSaveRefreshToken(userId);
      return createdRefreshToken;
    }
    const isRefreshTokenValid = this.authHelper.verifyRefreshToken(
      foundRefreshToken.refreshToken,
      userId
    );
    if (isRefreshTokenValid) return foundRefreshToken;
    const createdRefreshToken = this.createAndSaveRefreshToken(userId);
    return createdRefreshToken;
  }
}
