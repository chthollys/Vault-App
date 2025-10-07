import type { AxiosError } from "axios";
import type { ApiError } from "@repo/types";

type ApiErrorPayload = Partial<ApiError> & {
  message?: string;
  statusCode?: number;
};

const isAxiosError = (
  cause: unknown
): cause is AxiosError<ApiErrorPayload | ApiError> => {
  return (
    typeof cause === "object" &&
    cause !== null &&
    "isAxiosError" in cause &&
    Boolean((cause as AxiosError).isAxiosError)
  );
};

const pickMessage = (values: Array<string | undefined>): string => {
  for (const value of values) {
    if (value && value.trim().length > 0) {
      return value;
    }
  }

  return "Unknown error";
};

export const toApiError = (cause: unknown): ApiError => {
  if (isAxiosError(cause)) {
    const payload = cause.response?.data as ApiErrorPayload | undefined;
    const status = payload?.status ?? payload?.statusCode ?? cause.response?.status;
    const message = pickMessage([
      payload?.message,
      (payload as ApiError | undefined)?.message,
      cause.message,
    ]);

    return {
      message,
      status,
      details: payload?.details ?? payload ?? cause.toJSON?.(),
    } satisfies ApiError;
  }

  if (cause instanceof Error) {
    return { message: cause.message } satisfies ApiError;
  }

  if (typeof cause === "string") {
    return { message: cause } satisfies ApiError;
  }

  return { message: "Unknown error" } satisfies ApiError;
};
