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

  async getRefreshTokenByUserId(userId: string) {
    const foundUser = await this.userRepository.findOneUserById(userId);
    if (foundUser) {
      const foundRefreshToken =
        await this.authRepository.getExistingRefreshToken(userId);
    }
    const createdRefreshToken =
      this.authRepository.createAndSaveRefreshToken(userId);
    return createdRefreshToken;
  }
}
