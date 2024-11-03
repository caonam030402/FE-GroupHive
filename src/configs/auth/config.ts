import type { JWT, NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { authRefreshToken } from "@/api/auth";
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
          token: res!.payload?.token || "",
          refreshToken: res!.payload?.refreshToken || "",
          tokenExpires: res!.payload?.tokenExpires || 0,
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
      const tokenCustom = token as unknown as JWT;

      if (user) {
        return {
          ...token,
          exp: user.tokenExpires,
          user: user as User,
        };
      }

      if (token.exp !== undefined && token.exp > Date.now() / 1000) {
        return token;
      }

      const res = await authRefreshToken(tokenCustom.user.refreshToken);

      setCookies({
        value: res!.payload?.token || "",
        name: ENameCookie.ACCESS_TOKEN,
        expires: res.payload?.tokenExpires || 0,
      });

      const newToken = {
        ...token,
        exp: res?.payload?.tokenExpires || 0,
        user: {
          user: tokenCustom.user.user,
          token: res?.payload?.token || "",
          refreshToken: res?.payload?.refreshToken || "",
          tokenExpires: res?.payload?.tokenExpires || 0,
        },
      };

      return newToken;
    },
  },
} satisfies NextAuthConfig;
