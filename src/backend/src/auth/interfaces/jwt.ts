export interface JwtPayload {
  sub: string;
  email?: string;
  iat?: number;
  exp?: number;
}

export interface JwtRefPayload {
  sub: string;
  jti: string;
  email?: string;
  iat?: number;
  exp?: number;
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
}

export interface AccessToken {
  access_token: string;
}

export interface RefreshToken {
  refresh_token: string;
}

export interface TokenPair extends AccessToken, RefreshToken {}
