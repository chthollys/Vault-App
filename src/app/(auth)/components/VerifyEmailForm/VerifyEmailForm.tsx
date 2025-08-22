"use client";

import { useMutation } from "@tanstack/react-query";
import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyOtp } from "@/app/actions/otp";
import FormInputOtp from "./InputOtp";
import { SignInButton } from "@/UI/buttons";
import { FormTitle, GameDeveloper } from "@/components/Typography";
import { OTPSchema } from "@/lib/schemas";
import { GameCardWrapper } from "@/components/Wrapper";
import type { VerifyEmailFormProps } from "@/lib/types/props";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Input = z.infer<typeof OTPSchema>;

export default function VerifyEmailForm({ email }: VerifyEmailFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    defaultValues: { code: "", email },
    resolver: zodResolver(OTPSchema),
    mode: "onSubmit",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: verifyOtp,
    onSuccess: async () => {
      router.push("/set-password");
    },
    onError: (err) => {
      toast.error(err.message ?? "Something went wrong.");
    },
  });

  const onSubmit: SubmitHandler<Input> = ({ code, email }) => {
    mutate({ email, otp: code });
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
