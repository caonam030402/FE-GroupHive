"use server";

import type { ISuccessResponse } from "@/types";
import type { IAuth } from "@/types/auth";
import http from "@/utils/Http";

import type {
  IRequestConfirmOtp,
  IRequestGenerateOtp,
  IResponseGenerateOtp,
} from "./type";

export const authRegisterWithEmail = (body: IAuth) => {
  return http.post<{
    id: number;
  }>("/api/v1/auth/email/register", {
    body: body as any,
  });
};

export const authGenerateOtp = (body: IRequestGenerateOtp) => {
  return http.post<ISuccessResponse<IResponseGenerateOtp>>(
    "/api/v1/auth/otp/registration",
    {
      body: body as any,
    },
  );
};

export const authConfirmOtp = (body: IRequestConfirmOtp) => {
  return http.post<ISuccessResponse<null>>("/api/v1/auth/email/confirm/otp", {
    body: body as any,
  });
};
