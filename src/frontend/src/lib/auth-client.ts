import type {
  ApiDataResponse,
  ApiError,
  UserSession,
  UserSessionDto,
} from "@repo/types";
import { ApiRequestError } from "./http/common";
import { ApiResponse } from "@repo/types";
import { clientApiFetch } from "./http/client";

function extractStatus(
  error: ApiError | ApiRequestError | unknown
): number | undefined {
  if (!error || typeof error !== "object") {
    return undefined;
  }
  return (error as ApiError | ApiRequestError).status;
}

export async function logout() {
  try {
    const res = await clientApiFetch<ApiResponse>("/auth/logout", {
      method: "POST",
    });
    return res.message;
  } catch (err) {
    // Handle in useMutation
    const error = err as Error;
    throw error;
  }
}

export async function getCurrentUser(): Promise<UserSession | null> {
  try {
    const res =
      await clientApiFetch<ApiDataResponse<UserSessionDto>>("/auth/me");
    return res.data.user;
  } catch (err) {
    const status = extractStatus(err);
    if (status === 401 || status === 403) {
      return null;
    }
    const error = err as ApiError;
    throw new Error(error.message);
  }
}
