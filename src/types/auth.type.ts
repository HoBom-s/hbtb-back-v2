export interface Tokens {
  refreshToken: string;
  accessToken: string;
}

export interface RequestUserId {
  userId: string;
  reissuedAccessToken?: string;
}

export interface Auth {
  authInfo?: RequestUserId;
}

export type TokenType = "access" | "refresh";
