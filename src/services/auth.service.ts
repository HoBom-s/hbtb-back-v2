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

  createRefreshToken(userId: string) {
    const createdRefreshToken =
      this.authRepository.createAndSaveRefreshToken(userId);
    return createdRefreshToken;
  }
}
