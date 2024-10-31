import { cookies } from "next/headers";

export const setCookies = ({
  name,
  value,
  expires,
}: {
  name: string;
  value: string;
  expires: number;
}) => {
  return cookies().set({
    name,
    value,
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    expires: expires || new Date(),
    secure: true,
  });
};

export const clearCookies = ({ key }: { key: string }) => {
  return cookies().delete(key);
};
