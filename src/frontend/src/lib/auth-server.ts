"use server"
import { cookies } from "next/headers";
import type {
  ApiDataResponse,
  ApiResponse,
  CurrentUserSession,
} from "@repo/types";
import { serverApiFetch } from "./http/server";
import { clientApiFetch } from "./http/client";

export async function getCurrentUser() {
  const token = (await cookies()).get("jwt")?.value;
  if (!token) {
    return null;
  }

  try {
    const res = await serverApiFetch<ApiDataResponse<CurrentUserSession>>(
      "/auth/me",
      {
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
