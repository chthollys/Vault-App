import { serverApiFetch } from "@/lib/http/server";
import type { ApiDataResponse, UserSession, UserSessionDto } from "@repo/types";

export async function fetchCurrentUser(): Promise<UserSession | null> {
  try {
    const res =
      await serverApiFetch<ApiDataResponse<UserSessionDto>>("/auth/me");
    return res.data.user;
  } catch (err) {
    const status = (err as { status?: number }).status;
    if (status === 401 || status === 403) return null;
    throw err;
  }
}
