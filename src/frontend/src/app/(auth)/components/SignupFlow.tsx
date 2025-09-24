"use client";

import { UserSignupStep } from "@/lib/types/auth";
import { useEffect, useState } from "react";
import { VerifyEmailForm } from "./VerifyEmailForm";
import { SetPasswordForm } from "./SetPasswordForm";
import type { SignupFlowProps } from "@/lib/types/props";
import { getSignupStep } from "@/app/actions/api-client.action";
import { SignupForm } from "./SignupForm";

export default function SignupFlow({ initialStep }: SignupFlowProps) {
  const [step, setStep] = useState<UserSignupStep>(initialStep);

  useEffect(() => {
    async function fetchStep() {
      const { step } = await getSignupStep();
      setStep(step);
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
