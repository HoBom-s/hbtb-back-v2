class TokenResponseDto {
  accessToken: string;

  refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  toResponse(): TokenResponseDto {
    return new TokenResponseDto(this.accessToken, this.refreshToken);
  }
}

export default TokenResponseDto;
