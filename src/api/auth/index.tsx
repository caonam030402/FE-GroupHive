"use server";

import type { IAuth } from "@/types/auth";
import http from "@/utils/Http";

export const authRegisterWithEmail = (body: IAuth) => {
  return http.post("/api/v1/auth/email/register", { body: body as any });
};
