"use client";

import { UserSignupStep } from "@/lib/types/auth";
import { VerifyEmailForm } from "./VerifyEmailForm";
import { SetPasswordForm } from "./SetPasswordForm";
import { SignupForm } from "./SignupForm";
import { useQueryClient } from "@tanstack/react-query";
import { useSignupStep } from "@/app/hooks/useSignupStep";

export default function SignupFlow() {
  const step = useSignupStep();
  const queryClient = useQueryClient();
  const refreshStep = () =>
    queryClient.invalidateQueries({
      queryKey: ["signup-step"],
    });

  return (
    <div className="mt-20 w-full">
      {step === UserSignupStep.Start && <SignupForm onRefresh={refreshStep} />}
      {step === UserSignupStep.VerifyOtp && (
        <VerifyEmailForm onRefresh={refreshStep} />
      )}
      {step === UserSignupStep.SetPassword && <SetPasswordForm />}
    </div>
  );
}
