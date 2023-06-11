export type User = {
  token: string;
  username: string;
  email: string;
};

export type RegisterUser = {
  password: string;
  username: string;
  email: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type ErrorType = {
  response?: {
    data?: {
      error?: string;
    };
  };
};
