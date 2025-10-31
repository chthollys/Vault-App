"use server";

import type {
  ApiDataResponse,
  ApiError,
  CurrentUserSession,
} from "@repo/types";
import { serverApiFetch } from "./http/server";
import { ApiRequestError } from "./http/common";

function extractStatus(
  error: ApiError | ApiRequestError | unknown
): number | undefined {
  if (!error || typeof error !== "object") {
    return undefined;
  }
  return (error as ApiError | ApiRequestError).status;
}

export async function getCurrentUser(): Promise<CurrentUserSession | null> {
  try {
    const res =
      await serverApiFetch<ApiDataResponse<CurrentUserSession>>("/auth/me");
    return res.data;
  } catch (err) {
    const status = extractStatus(err);
    if (status === 401 || status === 403) {
      return null;
    }
    const error = err as ApiError;
    throw new Error(error.message);
  }
}
