import type { ApiError, ApiResponse } from "@repo/types";
import axiosClient from "../axios/client";

export const sendOtpFn = async (email: string) => {
  try {
    const res = (
      await axiosClient.post<ApiResponse<{ message: string }>>(
        "/auth/signup/email/req-otp",
        { email }
      )
    ).data;
    return res;
  } catch (err) {
    const error = err as ApiError;
    throw new Error(error.message);
  }
};

export const verifyOtp = async (otp: string) => {
  try {
    const res = (
      await axiosClient.post<ApiResponse<{ message: string }>>(
        "/auth/signup/email/verify-otp",
        { otp }
      )
    ).data;
    return res;
  } catch (err) {
    const error = err as ApiError;
    throw new Error(error.message);
  }
};

export const setPassword = async (password: string) => {
  try {
    const res = (
      await axiosClient.post<ApiResponse<{ message: string }>>(
        "/auth/signup/email/set-password",
        { password }
      )
    ).data;
    return res;
  } catch (err) {
    const error = err as ApiError;
    throw new Error(error.message);
  }
};
