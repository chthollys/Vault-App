"use client";

import { useState } from "react";

export interface DescriptionSectionProps {
  title: string;
  description: string;
  isExpanded?: boolean;
}

export default function DescriptionSection({
  title,
  description,
  isExpanded = true,
}: DescriptionSectionProps) {
  const [expanded, setExpanded] = useState<boolean>(isExpanded);
  return (
    <div className="mb-8 border-b-[1px] border-solid border-b-white/10 px-0 pt-0 pb-6">
      <h3 className="text-primary mb-4 text-2xl font-bold">{title}</h3>
      <div
        className={`overflow-hidden text-base leading-[1.6] text-white/90 transition-[max-height_0.3s_ease] ${expanded ? "max-h-[150px]" : "max-h-none"}`}
        id="description-content"
      >
        {description}
      </div>
      <button
        type="button"
        className="text-white/90 hover:text-primary-light mt-2 cursor-pointer border-none bg-none px-0 py-2 text-[0.9rem] font-semibold"
      >
        Read More
      </button>
    </div>
  );
}
