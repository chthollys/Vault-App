export type JwtPayload = {
  sub: string;
  email?: string;
  iat?: number;
  exp?: number;
};

export type AuthUser = {
  id: string;
  email: string;
};
