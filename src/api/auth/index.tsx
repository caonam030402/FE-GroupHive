"use server";

import type { ISuccessResponse } from "@/types";
import type { IAuth } from "@/types/auth";
import http from "@/utils/Http";

export const authRegisterWithEmail = (body: IAuth) => {
  return http.post<ISuccessResponse<null>>("/api/v1/auth/email/register", {
    body: body as any,
  });
};
