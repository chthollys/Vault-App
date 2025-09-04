"use client";

import type { ChildrenProp } from "@/lib/types/props";
import { Button } from "@heroui/react";

export default function GameBadge({ children }: ChildrenProp) {
  return (
    <Button
      color="secondary"
      variant="flat"
      className="w-max bg-[rgba(99,_102,_241,_0.1)] text-[rgba(99,_102,_241,_0.8)]"
    >
      {children}
    </Button>
  );
}
