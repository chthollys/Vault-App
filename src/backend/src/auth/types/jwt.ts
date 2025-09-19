export type JwtPayload = {
  sub: string;
  email?: string;
  iat?: number;
  exp?: number;
};

export type JwtRefPayload = {
  sub: string;
  jti: string;
  email?: string;
  iat?: number;
  exp?: number;
};

export type AuthUser = {
  id: string;
  email?: string;
};

export type AccessToken = {
  access_token: string;
};

export type RefreshToken = {
  refresh_token: string;
};

export type TokenPair = AccessToken & RefreshToken;
