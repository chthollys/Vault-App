import type { APIResponse } from "../types/src";

export function successResponse<T>(data: T, message?: string): APIResponse<T> {
  return {
    success: true,
    message,
    data,
  };
}
