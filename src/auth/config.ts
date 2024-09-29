import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        const user = null;

        console.log(credentials);

        if (!user) {
          throw new Error("User not found.");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    session: async ({ session }) => {
      return session;
    },
    // signIn: ({ account, profile }) => {
    //   console.log(account, profile);
    //   return true;
    // },
  },
} satisfies NextAuthConfig;
