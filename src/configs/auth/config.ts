import type { JWT, NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { listCredential } from "@/constants/auth";
import { ENameCookie } from "@/constants/common";
import type { IErrorResponse, IHttpResponse } from "@/types";
import type { IAuthResponse } from "@/types/auth";
import { setCookies } from "@/utils/clientStorage";

export default {
  // trustHost: process.env.NODE_ENV === "development",
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        const res = (await listCredential(
          credentials,
        )) as IHttpResponse<IAuthResponse>;

        if (!res!.ok) {
          const resErr = res.payload as unknown as IErrorResponse | null;

          const user: User = {
            error: resErr?.message || JSON.stringify(resErr?.errors),
            user: null,
          };
          return user;
        }

        setCookies({
          value: res!.payload?.token || "",
          name: ENameCookie.ACCESS_TOKEN,
          expires: res.payload.tokenExpires || 0,
        });

        const user: User = {
          user: res!.payload?.user || null,
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
    signIn: async ({ user }) => {
      if (user.error) {
        throw new Error(user.error || "error");
      }
      return true;
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
