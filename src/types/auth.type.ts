export interface RequestUserId {
  userId: string;
  reissuedAccessToken?: string;
}

export interface Auth {
  authInfo?: RequestUserId;
}

export type TokenType = "access" | "refresh";
