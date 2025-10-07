"use client";

import { UserSignupStep } from "@/lib/types/auth";
import { useEffect, useState } from "react";
import { VerifyEmailForm } from "./VerifyEmailForm";
import { SetPasswordForm } from "./SetPasswordForm";
import type { SignupFlowProps } from "@/lib/types/props";
import { getSignupStep } from "@/lib/db/client";
import { SignupForm } from "./SignupForm";
import { tryCatch } from "@/lib/types/try-catch";
import { toast } from "react-toastify";

export default function SignupFlow({ initialStep }: SignupFlowProps) {
  const [step, setStep] = useState<UserSignupStep>(initialStep);

  useEffect(() => {
    async function fetchStep() {
      const [data, err] = await tryCatch(getSignupStep);
      if (err || !data) toast.error("Failed to read user signup step.");
      setStep(data?.step ?? UserSignupStep.Start);
    }
    fetchStep();
  }, []);

  return (
    <div className="mt-20 w-full">
      {step === UserSignupStep.Start && <SignupForm onSuccess={setStep} />}
      {step === UserSignupStep.VerifyOtp && (
        <VerifyEmailForm onSuccess={setStep} />
      )}
      {step === UserSignupStep.SetPassword && (
        <SetPasswordForm onSuccess={setStep} />
      )}
    </div>
  );
}
