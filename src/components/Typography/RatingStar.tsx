"use client";

import { formatStarRating } from "@/lib/utils/utils";
import { useMemo } from "react";

export interface RatingStarProps {
  value: number | undefined;
}

export default function RatingStar({ value }: RatingStarProps) {
  const stars = useMemo(() => formatStarRating(value), [value]);
  return <span className="text-warning">{stars}</span>;
}
