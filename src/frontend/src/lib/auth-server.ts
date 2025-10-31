"use server";

import { cookies } from "next/headers";
import type { ApiDataResponse, CurrentUserSession } from "@repo/types";
import { serverApiFetch } from "./http/server";

export async function getCurrentUser() {
  const token = (await cookies()).get("jwt")?.value;
  if (!token) {
    return null;
  }

  try {
    const res = await serverApiFetch<ApiDataResponse<CurrentUserSession>>(
      "/auth/me",
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
    return res.data;
  } catch (err) {
    return null;
  }
}
