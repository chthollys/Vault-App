"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { GameCardWrapper } from "@/components/Wrapper";
import { FormTitle, GameDeveloper } from "@/components/Typography";
import { FormInput } from "@/UI/input";
import { SignInButton } from "@/UI/buttons";
import LoginAccountNow from "./LoginAccountNow";
import { sendOtpFn } from "@/app/actions/otp.action";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { EmailSchema } from "repo/schemas";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

type Inputs = z.infer<typeof EmailSchema>;

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { email: "" },
    mode: "onSubmit",
    resolver: zodResolver(EmailSchema),
  });
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: sendOtpFn,
    onSuccess: () => {
      router.push("/verify-email");
    },
    onError: (err) => toast.error(err.message ?? "Something went wrong."),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data.email);
  };

  return (
    <GameCardWrapper className="border-glass-border static h-max w-full min-w-[755px] cursor-default overflow-visible border-[1px] border-solid px-16 pt-16 pb-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-max w-full flex-col gap-8"
      >
        <FormTitle>Create new account</FormTitle>
        <div className="flex flex-col items-center gap-6">
          <FormInput
            {...register("email")}
            type="email"
            placeholder="Enter your email address"
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
          />
          <div className="flex w-full items-end justify-between text-nowrap">
            <GameDeveloper>
              Verification code will be sent to the email above.
            </GameDeveloper>
            <LoginAccountNow />
          </div>
        </div>
        <div className="flex w-full justify-end">
          <SignInButton
            type="submit"
            className="min-w-40 rounded-md normal-case"
            showIcon={false}
            loading={isPending}
            disabled={isPending}
          >
            Submit
          </SignInButton>
        </div>
      </form>
    </GameCardWrapper>
  );
}
