export type AuthUser = {
  userId: string;
  email: string;
};

export type JwtPayload = {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
};
