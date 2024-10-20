export const PATH = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
};

export const PUBLIC_PAGES = [PATH.LOGIN, PATH.REGISTER, PATH.HOME];

export enum ETriggerCredentials {
  LOGIN = "email",
  REGISTER = "register",
  OTP = "otp",
}

export enum ENameCookie {
  ACCESS_TOKEN = "_next-auth.htshs",
}
