"use server";

import { cookies } from "next/headers";
import { NEST_API_URL, API_URL } from "@/lib/env";
import {
  ApiRequestError,
  buildUrl,
  parseResponse,
  type ApiFetchOptions,
} from "./common";

export async function serverApiFetch<T>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const {
    params,
    json,
    headers: extraHeaders,
    method,
    credentials,
    ...rest
  } = options;

  // const headerList = await headers();
  // const protocol = headerList.get("x-forwarded-proto") ?? "http";
  // const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  // Server-side fetch in Node requires an absolute URL.
  // Prefer direct backend URL over proxy-relative paths.
  const base = NEST_API_URL ?? API_URL ?? "/api";
  const url = buildUrl(base, path, params);
  const cookieHeader = (await cookies()).toString();

  const requestInit: RequestInit = {
    method: method ?? (json !== undefined ? "POST" : "GET"),
    credentials: credentials ?? "include",
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      ...(extraHeaders ?? {}),
    },
    cache: "no-store",
    ...rest,
  };

  if (json !== undefined) {
    requestInit.body = JSON.stringify(json);
  }

  try {
    const response = await fetch(url, requestInit);
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
