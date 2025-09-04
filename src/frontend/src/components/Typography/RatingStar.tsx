"use client";

import { formatStarRating } from "@/lib/utils/utils";
import { useMemo } from "react";
import { Wrapper } from "@/components/Wrapper/base";
import type { SpanElementProps } from "@/lib/types/props";

export interface RatingStarProps extends SpanElementProps {
  value: number | undefined;
}

export default function RatingStar({
  value,
  className,
  ...props
}: RatingStarProps) {
  const stars = useMemo(() => formatStarRating(value), [value]);
  return (
    <Wrapper nextClass={className} className="text-warning" {...props}>
      {stars}
    </Wrapper>
  );
}
