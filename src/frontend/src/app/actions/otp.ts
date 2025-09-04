type VerifyOtpInput = {
  email: string;
  otp: string;
};

export const sendOtpFn = async (email: string) => {
  const res = await fetch("/api/auth/signup/send-otp", {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Send OTP request failed.");
  }

  return data;
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
