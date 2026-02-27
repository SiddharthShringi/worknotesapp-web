export interface SignupParams {
  user: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
  };
}

export interface LoginParams {
  user: {
    email: string;
    password: string;
  };
}
