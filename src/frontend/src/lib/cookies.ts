"use server";

import { cookies } from "next/headers";
import type { CookieOptions } from "./types/cookies";
import { IS_PROD } from "@/lib/env";

export const getCookieValue = async (name: string) => {
  return (await cookies()).get(name)?.value;
};

export const setCookie = async ({
  secure = IS_PROD,
  ...config
}: CookieOptions) => {
  (await cookies()).set({
    ...config,
    secure,
  });
};

export const deleteCookie = async (name: string) => {
  (await cookies()).delete(name);
};
