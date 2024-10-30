import { authConfirmOtp } from "@/api/auth";

export enum ETriggerCredentials {
  LOGIN = "email",
  REGISTER = "register",
  OTP = "otp",
}

export const listCredential = (
  credentials: Partial<Record<string, unknown>>,
) => {
  return {
    [ETriggerCredentials.OTP]: authConfirmOtp({
      user: {
        id: Number(credentials.userId),
      },
      code: Number(credentials.code),
    }),
  };
};
