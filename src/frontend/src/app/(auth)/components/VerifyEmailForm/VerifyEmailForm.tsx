"use client";

import { useMutation } from "@tanstack/react-query";
import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyOtp } from "@/lib/otp-signup";
import FormInputOtp from "./InputOtp";
import { SignInButton } from "@/UI/buttons";
import { FormTitle, GameDeveloper } from "@/components/Typography";
import { OTPSchema } from "@repo/types";
import { GameCardWrapper } from "@/components/Wrapper";
import { toast } from "react-toastify";
import { SignupFormProps } from "@/lib/types/props";
import { getSignupStep } from "@/lib/db/client";

type Input = z.infer<typeof OTPSchema>;

export default function VerifyEmailForm({ onSuccess }: SignupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    defaultValues: { code: "" },
    resolver: zodResolver(OTPSchema),
    mode: "onSubmit",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: verifyOtp,
    onSuccess: async (data) => {
      toast.success(data.message ?? "OTP verified succesfully");
      const { step } = await getSignupStep();
      onSuccess(step);
    },
    onError: (err) => {
      toast.error(err.message ?? "Something went wrong.");
    },
  });

  const onSubmit: SubmitHandler<Input> = ({ code }) => {
    mutate(code);
  };

  return (
    <GameCardWrapper className="border-glass-border static m-auto h-max max-w-4xl cursor-default overflow-visible border-[1px] border-solid px-16 pt-16 pb-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-max w-full flex-col gap-6"
      >
        <FormTitle>Enter verification code</FormTitle>
        <GameDeveloper>
          Verification code has been sent, please check your email.
        </GameDeveloper>
        <div className="flex flex-col items-center gap-6">
          <FormInputOtp
            {...register("code")}
            length={6}
            isInvalid={!!errors.code}
            errorMessage={errors.code?.message}
          />
          <div className="flex w-full items-center justify-between text-nowrap">
            <GameDeveloper></GameDeveloper>
          </div>
        </div>
        <div className="flex w-full justify-end">
          <SignInButton
            type="submit"
            loading={isPending}
            disabled={isPending}
            showIcon={false}
            className="min-w-40 rounded-md normal-case"
          >
            Submit
          </SignInButton>
        </div>
      </form>
    </GameCardWrapper>
  );
}
