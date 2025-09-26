"use server";

import { cookies } from "next/headers";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { IS_PROD } from "@/lib/env";

export const getCookieValue = async (name: string) => {
  return (await cookies()).get(name)?.value;
};

export const setCookie = async ({
  secure = IS_PROD,
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
