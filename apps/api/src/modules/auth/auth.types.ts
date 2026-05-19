export type NewUser = {
  name: string;
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  password: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};
