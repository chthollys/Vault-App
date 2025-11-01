import { NEST_API_URL, NEXT_PUBLIC_API_PROXY_BASE } from "@/lib/env";
import {
  type ApiFetchOptions,
  ApiRequestError,
  buildUrl,
  parseResponse,
} from "./common";

export async function clientApiFetch<T>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const { params, json, headers, method, credentials, ...rest } = options;

  const base = NEXT_PUBLIC_API_PROXY_BASE ?? NEST_API_URL ?? "/api";
  const url = buildUrl(base, path, params);

  const init: RequestInit = {
    method: method ?? (json !== undefined ? "POST" : "GET"),
    credentials: credentials ?? "include",
    headers: {
      "Content-Type": "application/json",
      ...(headers ?? {}),
    },
    ...rest,
  };

  if (json !== undefined) {
    init.body = JSON.stringify(json);
  }

  try {
    const response = await fetch(url, init);
    return await parseResponse<T>(response);
  } catch (error) {
    if (error instanceof ApiRequestError) {
      throw error;
    }
    throw new ApiRequestError(
      error instanceof Error ? error.message : "Unexpected error"
    );
  }
}
