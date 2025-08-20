import { InputOtp, InputOtpProps } from "@heroui/react";

export default function FormInputOtp({ ...props }: InputOtpProps) {
  return (
    <InputOtp
      size="lg"
      radius="md"
      classNames={{
        input: ["text-black/90 dark:text-white/90"],
        segment: ["bg-glass"],
      }}
      errorMessage="Please enter valid OTP code."
      {...props}
    />
  );
}
