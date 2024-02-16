import Auth from "../entities/auth.entity";
import { myDataSource } from "../data-source";
import { Repository } from "typeorm";
import AuthHelper from "../helpers/auth.helper";

export class AuthRepository {
  private auth: Repository<Auth>;
  private authHelper: AuthHelper;

  constructor() {
    this.auth = myDataSource.getRepository(Auth);
    this.authHelper = new AuthHelper();
  }

  async createAndSaveRefreshToken(userId: string) {
    const createdRefreshToken = this.authHelper.createRefreshToken(userId);

    await this.auth.save({
      userId,
      refreshToken: createdRefreshToken,
    });

    return createdRefreshToken;
  }

  async getRefreshToken(userId: string): Promise<string> {
    const foundRefreshToken = await this.auth.findOneBy({ userId });
    if (!foundRefreshToken) {
      return this.createAndSaveRefreshToken(userId);
    }
    return foundRefreshToken.refreshToken;
  }

  removeRefreshToken(userId: string) {
    return this.auth.delete({ userId });
  }
}
