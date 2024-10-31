"use server";

import type { ISuccessResponse } from "@/types";
import type { IAuth, IAuthResponse } from "@/types/auth";
import http from "@/utils/http";

import type {
  IRequestConfirmOtp,
  IRequestGenerateOtp,
  IResponseGenerateOtp,
} from "./type";

export const authRegisterWithEmail = (body: IAuth) => {
  return http.post<{
    id: number;
  }>("auth/email/register", {
    body: body as any,
  });
};

export const authLoginWithEmail = (body: IAuth) => {
  return http.post<{
    id: number;
  }>("auth/email/login", {
    body: body as any,
  });
};

export const authGenerateOtp = (body: IRequestGenerateOtp) => {
  return http.post<ISuccessResponse<IResponseGenerateOtp>>("otps", {
    body: body as any,
  });
};

export const authConfirmOtp = (body: IRequestConfirmOtp) => {
  return http.post<IAuthResponse>("auth/email/confirm/otp", {
    body: body as any,
  });
};
