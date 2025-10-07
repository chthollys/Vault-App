import axios, { type AxiosError } from "axios";
import qs from "qs";
import type { ApiError, ApiErrorResponse } from "@repo/types";
import { API_URL } from "../env";

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  allowAbsoluteUrls: false,
  method: "GET",
  withCredentials: true,
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: "comma" }),
  },
});

export function normalizeError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<ApiErrorResponse>;
    return {
      status: err.response?.status,
      message:
        err.response?.data.message || err.message || "Something went wrong",
      details: err.response?.data,
    };
  }

  return { message: (error as Error)?.message ?? "Unknown error" };
}

axiosClient.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(normalizeError(err))
);

export default axiosClient;
