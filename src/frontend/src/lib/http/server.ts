"use server";

import { cookies } from "next/headers";
import { NEST_API_URL, NEXT_PUBLIC_API_PROXY_BASE } from "@/lib/env";
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
  const base = NEXT_PUBLIC_API_PROXY_BASE ?? NEST_API_URL ?? "/api";
  const url = buildUrl(base, path, params);
  const cookieHeader = (await cookies()).toString();

  const requestInit: RequestInit = {
    method: method ?? (json !== undefined ? "POST" : "GET"),
    headers: {
      "Content-Type": "application/json",
      credentials: credentials ?? "include",
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
