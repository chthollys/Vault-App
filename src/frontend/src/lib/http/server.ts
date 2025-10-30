"use server";

import { cookies, headers } from "next/headers";
import { API_URL, NEXT_APP_ORIGIN_URL } from "@/lib/env";
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
  const { params, json, headers: extraHeaders, method, ...rest } = options;

  const headerList = await headers();
  const protocol = headerList.get("x-forwarded-proto") ?? "http";
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  const origin =
    API_URL ??
    NEXT_APP_ORIGIN_URL ??
    `${protocol}://${host ?? "localhost:3000"}`;

  const url = buildUrl(origin, path, params);

  const cookieHeader = (await cookies()).toString();

  const requestInit: RequestInit = {
    method: method ?? (json !== undefined ? "POST" : "GET"),
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
