"use client";

import { ScrollShadow } from "@heroui/react";
import type { DescriptionSectionProps } from "@/lib/types/props";

export default function DescriptionSection({
  title,
  description,
}: DescriptionSectionProps) {
  return (
    <div className="mb-8 border-b-[1px] border-solid border-b-white/10 px-0 pt-0 pb-6">
      <h3 className="text-primary mb-4 text-2xl font-bold">{title}</h3>
      <ScrollShadow className="max-h-40 w-full" hideScrollBar size={70}>
        <p
          className={`text-base leading-[1.6] text-white/90 transition-[max-height_0.3s_ease]`}
          id="description-content"
        >
          {description}
        </p>
      </ScrollShadow>
    </div>
  );
}
