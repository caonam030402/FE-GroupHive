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
  await signIn("credentials", body, { redirectTo: "/" });
}

export async function signOut() {
  await _signOut({ redirectTo: PATH.LOGIN });
}
