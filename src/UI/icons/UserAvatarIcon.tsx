"use client";

import ImageOptimized from "@/components/ImageOptimized";
import type { UserAvatarIconProps } from "@/lib/types/props";
import { DEFAULT_AVATAR_IMG } from "@/lib/utils/constants";

export default function UserAvatarIcon({
  imageUrl,
  onClick,
}: UserAvatarIconProps) {
  return (
    <ImageOptimized
      alt="Avatar Icon"
      src={imageUrl ?? DEFAULT_AVATAR_IMG}
      className="w-8 rounded-md hover:cursor-pointer"
      onClick={onClick}
    />
  );
}
