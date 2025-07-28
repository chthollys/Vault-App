import { NonNullableObject } from "@/lib/definitions";

export const hasCompleteValue = <T extends object>(
  obj: T
): obj is NonNullableObject<T> => {
  const values = Object.values(obj);
  const hasInvalidValue = values.some(
    (value) => value === null || value === undefined
  );

  return !hasInvalidValue;
};

export const formatToUSD = (value: number | string): string => {
  const numericValue = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(numericValue)) {
    console.error(`Invalid input: "${value}" cannot be converted to a number.`);
    return "";
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(numericValue);
};

export const formatStarRating = (rating: number | null | undefined): string => {
  if (!rating) return "INVALID RATING VALUE";
  const clampedRating = Math.max(0, Math.min(5, rating));

  const fullStar = "★";
  const halfStar = "⯪";
  const emptyStar = "☆";
  let result = "";

  const fullStars = Math.floor(clampedRating);
  const hasHalfStar = clampedRating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  result += fullStar.repeat(fullStars);
  if (hasHalfStar) {
    result += halfStar;
  }
  result += emptyStar.repeat(emptyStars);

  return result;
};
