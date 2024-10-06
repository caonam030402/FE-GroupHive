export interface IAuth {
  email: string;
  password: string;
}

export interface IAuthErrorResponse {
  status?: number;
  errors?: {
    [key: string]: string;
  };
}
