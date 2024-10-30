"use server";

import { PATH } from "@/constants/common";
import type { IAuthCredentials } from "@/types/auth";

import { signIn, signOut as _signOut } from "./auth";

export async function signInWithOAuth({
  provider,
}: {
  provider: "google" | "facebook";
}) {
  await signIn(provider, { redirectTo: "/" });
}

export async function authCredential(body: IAuthCredentials) {
  try {
    return await signIn("credentials", body);
  } catch (error: any) {
    return {
      error: error.cause?.err?.message,
    };
  }
}

export async function signOut() {
  await _signOut({ redirectTo: PATH.LOGIN });
}
