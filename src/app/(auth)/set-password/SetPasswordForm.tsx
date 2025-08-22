"use client";

import { useMutation } from "@tanstack/react-query";
import z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInButton } from "@/UI/buttons";
import { FormTitle } from "@/components/Typography";
import { PasswordSchema } from "@/lib/schemas";
import { GameCardWrapper } from "@/components/Wrapper";
import type { VerifyEmailFormProps } from "@/lib/types/props";
import { useRouter } from "next/navigation";
import { FormPasswordInput } from "@/UI/input";
import { createUserAccount } from "@/app/actions/user";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

type Input = z.infer<typeof PasswordSchema>;

export default function SetPasswordForm({ email }: VerifyEmailFormProps) {
  const [passwordErrorsArray, setPasswordErrorsArray] = useState<string[]>([]);
  const router = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    defaultValues: { password: "", confirm: "" },
    resolver: zodResolver(PasswordSchema),
    mode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createUserAccount,
    onSuccess: async (data) => {
      toast.success(
        `Your account created succesfully, you're logged in ${data.user.email ? `as ${data.user.email}` : "."}`
      );
      router.push("/");
    },
    onError: (err) => {
      toast.error(err.message ?? "Something went wrong.");
    },
  });

  const watched = watch(["password", "confirm"]);
  const debouncedWatched = useDebounce<string[]>(watched, 300);

  useEffect(() => {
    const errorParsing = () => {
      const parsed = PasswordSchema.safeParse({
        password: debouncedWatched[0] ?? "",
        confirm: debouncedWatched[1] ?? "",
      });

      if (
        !parsed.success &&
        (debouncedWatched[0] !== "" || debouncedWatched[1] !== "")
      ) {
        setPasswordErrorsArray(
          z.flattenError(parsed.error).fieldErrors.password ?? []
        );
      } else {
        setPasswordErrorsArray([]);
      }
    };

    errorParsing();
  }, [debouncedWatched]);

  const onSubmit: SubmitHandler<Input> = ({ password }) => {
    mutate({ email, password });
  };

  return (
    <GameCardWrapper className="border-glass-border static m-auto h-max max-w-4xl cursor-default overflow-visible border-[1px] border-solid px-16 pt-16 pb-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-max w-full flex-col gap-10"
      >
        <FormTitle>Set password for your account</FormTitle>
        <div className="flex flex-col items-center gap-6">
          <FormPasswordInput
            {...register("password")}
            placeholder="Enter your new password"
            isInvalid={passwordErrorsArray && passwordErrorsArray.length > 0}
            errorMessages={passwordErrorsArray}
          />
          <FormPasswordInput
            {...register("confirm")}
            placeholder="Confirm your new password"
            isInvalid={!!errors.confirm}
            errorMessage={errors.confirm?.message}
          />
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
