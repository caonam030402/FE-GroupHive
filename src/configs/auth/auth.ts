import NextAuth from "next-auth";

import authConfig from "./config";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  secret: process.env.AUTH_SECRET,
  ...authConfig,
});
