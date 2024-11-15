export const PATH = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  WORKPLACE: "/workplace",
  MESSENGER: "/workplace/messenger",
};

export const PUBLIC_PAGES = [
  PATH.LOGIN,
  PATH.REGISTER,
  PATH.HOME,
  PATH.WORKPLACE,
  PATH.MESSENGER,
];

export enum ENameCookie {
  ACCESS_TOKEN = "_next-auth.htshs",
}
