"use client";

import type { BadgedIconProps } from "@/lib/types/props";
import { Badge } from "@heroui/react";

export default function BadgedIcon({
  icon,
  isInvisible = false,
}: BadgedIconProps) {
  return (
    <Badge color="danger" content="" isInvisible={isInvisible}>
      {icon}
    </Badge>
  );
}
