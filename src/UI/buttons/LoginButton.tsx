"use client";

import { Button, ButtonProps } from "@heroui/react";
import { CgProfile } from "react-icons/cg";

export default function LoginButton({ children, ...props }: ButtonProps) {
  return (
    <Button startContent={<CgProfile size={20} />} color="primary" variant="ghost" {...props}>
      {children}
    </Button>
  );
}
