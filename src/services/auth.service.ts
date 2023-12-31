import AuthHelper from "../helpers/auth.helper";
import { AuthRepository } from "../repositories/auth.repository";
import { UserRepository } from "../repositories/user.repository";

export class AuthService {
  private authRepository: AuthRepository;
  private authHelper: AuthHelper;
  private userRepository: UserRepository;

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
    return refreshToken;
  }

  removeRefreshToken(userId: string) {
    return this.authRepository.removeRefreshToken(userId);
  }
}
