import type { ApiError, ApiResponse } from "@repo/types";
import { clientApiFetch } from "@/lib/http/client";

export const sendOtpFn = async (email: string) => {
  try {
    const res = await clientApiFetch<ApiResponse<{ message: string }>>(
      "/auth/signup/email/req-otp",
      { json: { email } }
    );
    return res;
  } catch (err) {
    const error = err as ApiError;
    throw new Error(error.message);
  }
};

export const verifyOtp = async (otp: string) => {
  try {
    const res = await clientApiFetch<ApiResponse<{ message: string }>>(
      "/auth/signup/email/verify-otp",
      { json: { otp } }
    );
    return res;
  } catch (err) {
    const error = err as ApiError;
    throw new Error(error.message);
  }
};

export const setPassword = async (password: string) => {
  try {
    const res = await clientApiFetch<ApiResponse<{ message: string }>>(
      "/auth/signup/email/set-password",
      { json: { password } }
    );
    return res;
  } catch (err) {
    const error = err as ApiError;
    throw new Error(error.message);
  }
};
