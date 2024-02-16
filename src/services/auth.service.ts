import AuthHelper from "../helpers/auth.helper";
import { AuthRepository } from "../repositories/auth.repository";

export class AuthService {
  private authRepository: AuthRepository;
  private authHelper: AuthHelper;

  constructor() {
    this.authRepository = new AuthRepository();
    this.authHelper = new AuthHelper();
  }

  createAccessToken(userId: string) {
    const createdAccessToken = this.authHelper.createAccessToken(userId);
    return createdAccessToken;
  }

  async getRefreshToken(userId: string) {
    const refreshToken = await this.authRepository.getRefreshToken(userId);

    const isRefreshTokenValid =
      this.authHelper.verifyRefreshToken(refreshToken);

    if (!isRefreshTokenValid) {
      return this.authRepository.createAndSaveRefreshToken(userId);
    }

    return refreshToken;
  }

  removeRefreshToken(userId: string) {
    return this.authRepository.removeRefreshToken(userId);
  }
}
