import { cookies } from "next/headers";
import type { JWT, NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { authConfirmOtp } from "@/api/auth";
import { ENameCookie } from "@/constants/common";
import type { IErrorResponse } from "@/types";

export default {
  trustHost: process.env.NODE_ENV === "development",
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        const res = await authConfirmOtp({
          user: {
            id: Number(credentials.userId),
          },
          code: Number(credentials.code),
        });

        if (!res.ok) {
          const resErr = res.payload as IErrorResponse | null;
          throw Error("error type", {
            cause: { server_message: resErr?.message },
          });
        }

        cookies().set({
          name: ENameCookie.ACCESS_TOKEN,
          value: res.payload?.token || "",
          httpOnly: true,
          path: "/",
          sameSite: "strict",
          expires: res.payload?.tokenExpires,
          secure: true,
        });

        const user: User = {
          user: res.payload?.user || null,
        };

        return user;
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    session: async ({ session, token }) => {
      const tokenCustom = token as unknown as JWT;

      return {
        ...session,
        user: tokenCustom.user as any,
      };
    },

    jwt: async ({ token, user }) => {
      if (user) {
        return {
          ...token,
          user: user as User,
        };
      }
      return token;
    },
  },
} satisfies NextAuthConfig;
