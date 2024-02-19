export type TTokens = {
  refreshToken: string;
  accessToken: string;
};

export type RequestUserId = {
  userId: string;
  reissuedAccessToken?: string;
};

export type TokenType = "access" | "refresh";

export interface Auth {
  authInfo?: RequestUserId;
}
