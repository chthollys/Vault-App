import qs from "qs";

export type ApiFetchOptions = Omit<RequestInit, "body"> & {
  params?: Record<string, unknown>;
  json?: unknown;
};

export class ApiRequestError extends Error {
  status?: number;
  details?: unknown;

  constructor(message: string, status?: number, details?: unknown) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.details = details;
  }
}

type BuildUrlParams = Record<string, unknown | undefined>;

export function buildUrl(
  base: string,
  path: string,
  params?: BuildUrlParams
): string {
  const isAbsolute = /^https?:\/\//i.test(path);
  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith("/")
    ? path
    : path.length > 0
      ? `/${path}`
      : "";
  const url = isAbsolute ? path : `${normalizedBase}${normalizedPath}`;

  if (!params || Object.keys(params).length === 0) {
    return url;
  }

  const query = qs.stringify(params, {
    arrayFormat: "comma",
    skipNulls: true,
    encode: true,
  });

  return query ? `${url}?${query}` : url;
}

export async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");

  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload && "message" in payload
        ? String((payload as { message?: unknown }).message)
        : response.statusText || "Request failed";

    throw new ApiRequestError(
      message || "Request failed",
      response.status,
      payload
    );
  }

  return payload as T;
}
