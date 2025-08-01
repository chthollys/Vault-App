"use client";

import { ButtonElementProps } from "@/lib/definitions";

export default function ArrowNavButton({
  children,
  ...props
}: ButtonElementProps) {
  return (
    <button
      className="cursor-pointer rounded-full border-none bg-black/40 px-4 py-3 text-2xl leading-[1] text-white transition-[background-color_0.2s]"
      {...props}
    >
      {children}
    </button>
  );
}
