import axios, { type AxiosInstance } from "axios";
import { cookies } from "next/headers";
import qs from "qs";
import { normalizeError } from "@/lib/axios/client";
import { API_URL, NEXT_APP_ORIGIN_URL } from "../env";
import { headers } from "next/headers";

export async function createServerAxios(): Promise<AxiosInstance> {
  const headerList = await headers();
  const protocol = headerList.get("x-forwarded-proto") ?? "http";
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  const origin = NEXT_APP_ORIGIN_URL ?? `${protocol}://${host}`;

  const cookieHeader = (await cookies()).toString();
  const instance = axios.create({
    baseURL: `${origin}/api`,
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    allowAbsoluteUrls: false,
    method: "GET",
    withCredentials: true,
    paramsSerializer: {
      serialize: (params) => qs.stringify(params, { arrayFormat: "comma" }),
    },
  });

  instance.interceptors.response.use(
    (res) => res,
    (err) => Promise.reject(normalizeError(err))
  );

  return instance;
}
