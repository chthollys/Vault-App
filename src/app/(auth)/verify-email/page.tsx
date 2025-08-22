import { auth } from "@/auth";
import { redirect } from "next/navigation";
import VerifyEmailForm from "../components/VerifyEmailForm/VerifyEmailForm";
import { getCookieValue } from "@/app/actions/cookies";

export default async function VerifyEmailPage() {
  const session = await auth();
  if (session) redirect("/");

  const emailVerified = await getCookieValue("otp-verified");
  const emailRequestOTP = await getCookieValue("otp-sent");

  // OTP verified, redirect user for account creation
  if (emailVerified) {
    redirect("/set-password");
  }

  // Failed to get email
  if (!emailRequestOTP) {
    redirect("/signup");
  }

  return (
    <div className="mt-20 w-full">
      <VerifyEmailForm email={emailRequestOTP} />
    </div>
  );
}
