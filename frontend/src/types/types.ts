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

export type ErrorResponse = {
  response: {
    data: {
      error: string;
    };
  };
};

export type LoginResponse = {
  token: string;
  username: string;
  email: string;
  [key: string]: unknown; // Index signature for arbitrary properties
};
