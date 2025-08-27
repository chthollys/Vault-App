"use client";

import type { DeleteCartItemButtonProps } from "@/lib/types/props";
import { Button } from "@heroui/react";
import { MdDeleteForever } from "react-icons/md";

export default function DeleteCartItemButton({
  onClick,
}: DeleteCartItemButtonProps) {
  return (
    <Button
      variant="ghost"
      color="danger"
      onPress={onClick}
      size="sm"
      isIconOnly
      className="border-none"
    >
      <MdDeleteForever size={30} />
    </Button>
  );
}
