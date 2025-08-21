"use server";

import { getCookieValue } from "@/app/actions/cookies";
import { redirect } from "next/navigation";
import SetPasswordForm from "./SetPasswordForm";
import { auth } from "@/auth";

export default async function SetPasswordPage() {
  const session = await auth();
  if (session) redirect("/");

  const emailRequestOTP = await getCookieValue("otp-sent");
  const emailVerified = await getCookieValue("otp-verified");

  if (!emailVerified || emailRequestOTP !== emailVerified) {
    redirect("/signup?error=signup-first");
  }

  return (
    <div className="mt-20 w-full">
      <SetPasswordForm email={emailVerified} />
    </div>
  );
}
