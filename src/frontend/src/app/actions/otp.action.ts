import axiosClient, { ApiError } from "@/lib/axios-client";

type VerifyOtpInput = {
  email: string;
  otp: string;
};

export const sendOtpFn = async (email: string) => {
  try {
    const res = await axiosClient({
      url: "/auth/",
      method: "POST",
      data: { email },
    });
    return res;
  } catch (err) {
    const error = err as ApiError;
    throw new Error(error.message);
  }
};

export const verifyOtp = async ({ email, otp }: VerifyOtpInput) => {
  const res = await fetch("/api/auth/signup/verify", {
    method: "POST",
    body: JSON.stringify({ email, otp }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || "Verify OTP failed.");
  return data;
};
