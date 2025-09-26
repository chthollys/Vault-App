import axios, { type AxiosInstance, type AxiosError } from "axios";
import { cookies } from "next/headers";
import qs from "qs";
import { normalizeError } from "@/lib/axios-client";
import { API_URL } from "./env";

export async function createServerAxios(): Promise<AxiosInstance> {
  const cookieHeader = (await cookies()).toString();
  const instance = axios.create({
    baseURL: API_URL,
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
