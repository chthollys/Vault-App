import { serverApiFetch } from "@/lib/http/server";
import type { ApiDataResponse, CurrentUserSession } from "@repo/types";

export async function fetchCurrentUser() {
  try {
    const res =
      await serverApiFetch<ApiDataResponse<CurrentUserSession>>("/auth/me");
    return res.data;
  } catch (err) {
    const status = (err as { status?: number }).status;
    if (status === 401 || status === 403) return null;
    throw err;
  }
}
