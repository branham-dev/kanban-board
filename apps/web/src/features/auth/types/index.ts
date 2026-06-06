export type AuthState = 'login' | 'register';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type UserResponse = {
  success: boolean;
  message: string;
  data: AuthUser;
};
