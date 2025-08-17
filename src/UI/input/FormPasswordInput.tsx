"use client";

import { useState } from "react";
import { Input } from "@heroui/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../icons";
import type { AuthFormInputProps } from "@/lib/types/props";

export default function FormPasswordInput({
  name,
  id = name,
  label = "",
  placeholder = "",
}: AuthFormInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      id={id}
      name={name}
      label={label}
      type={isVisible ? "text" : "password"}
      size="lg"
      labelPlacement="outside-top"
      placeholder={placeholder}
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
      endContent={
        <button
          aria-label="toggle password visibility"
          className="outline-transparent focus:outline-solid"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeSlashFilledIcon className="text-default-400 pointer-events-none text-2xl" />
          ) : (
            <EyeFilledIcon className="text-default-400 pointer-events-none text-2xl" />
          )}
        </button>
      }
      variant="bordered"
    />
  );
}
