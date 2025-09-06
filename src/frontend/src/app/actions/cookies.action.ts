"use server";

import { cookies } from "next/headers";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const getCookieValue = async (name: string) => {
  return (await cookies()).get(name)?.value;
};

export const setCookie = async ({
  secure = process.env.NODE_ENV === "production",
  ...config
}: ResponseCookie) => {
  (await cookies()).set({
    ...config,
    secure,
  });
};

export const deleteCookie = async (name: string) => {
  (await cookies()).delete(name);
};
