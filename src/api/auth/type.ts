export interface IRequestGenerateOtp {
  user: {
    id: number;
  };
  expiresTime: number;
}

export interface IRequestConfirmOtp {
  user: {
    id: number;
  };
  code: number;
}

export interface IResponseGenerateOtp {
  user: {
    id: number;
  };
  expiresTime: number;
}
