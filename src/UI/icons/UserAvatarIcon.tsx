"use client";

import ImageOptimized from "@/components/ImageOptimized";
import type { UserAvatarIconProps } from "@/lib/types/props";

export default function UserAvatarIcon({
  imageUrl,
  onClick,
}: UserAvatarIconProps) {
  return (
    <ImageOptimized
      alt="Avatar Icon"
      src={
        imageUrl ??
        "https://vault-app-bucket.s3.ap-southeast-2.amazonaws.com/default-cover/user-default.jpg"
      }
      className="w-8 rounded-md hover:cursor-pointer"
      onClick={onClick}
    />
  );
}
