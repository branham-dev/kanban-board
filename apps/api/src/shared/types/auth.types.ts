export type AuthUser = {
  userId: string;
  email?: string;
};

export type JwtPayload = {
  userId: string;
  iat?: number;
  exp?: number;
};
