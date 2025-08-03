import { NonNullableObject } from "@/lib/types/utils";

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

export const formatStarRating = (
  rating: string | number | undefined
): string => {
  if (rating === undefined || rating === null) return "INVALID RATING VALUE";
  let ratingNum;
  if (typeof rating === "string") {
    ratingNum = parseInt(rating);
  } else {
    ratingNum = rating;
  }
  const clampedRating = Math.max(0, Math.min(5, ratingNum));

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

export const getRandomSubArray = <T>(arr: T[], n: number): T[] => {
  if (n > arr.length) {
    throw new RangeError("getRandom: more elements taken than available");
  }

  const result = new Array<T>(n);
  let len = arr.length;
  const taken: number[] = new Array(len);

  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }

  return result;
};
