"use client";

import type { AuthFormInputProps } from "@/lib/types/props";
import { Input } from "@heroui/react";
import { forwardRef } from "react";

const FormInput = forwardRef<HTMLInputElement, AuthFormInputProps>(
  function FormInput(
    {
      name,
      id = name,
      label = "",
      placeholder = "",
      type = "text",
      isInvalid,
      errorMessage,
      ...props
    },
    ref
  ) {
    return (
      <Input
        ref={ref}
        id={id}
        name={name}
        label={label}
        type={type}
        size="lg"
        labelPlacement="outside-top"
        placeholder={placeholder}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        {...props}
        classNames={{
          label: "text-[0.9rem] font-medium tracking-wide text-white/70",
          input: ["bg-glass", "text-black/90 dark:text-white/90", "pl-4"],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-glass",
            "bg-glass",
            "hover:bg-glass-hover!",
            "group-data-[focus=true]:bg-glass-active",
            "group-data-[hover=true]:bg-glass-hover!",
            "cursor-text!",
            "border-glass-border",
            "backdrop-glass",
            "rounded-lg",
            "border-[1px]",
            "border-solid ",
            "text-[0.95rem]",
            "text-white/90",
            "transition",
          ],
        }}
      />
    );
  }
);

export default FormInput;
