export type NonNullableObject<T> = { [P in keyof T]: NonNullable<T[P]> };

export type SortingRules = {
  categories?: string[] | null;
  sortBy?: string[] | null;
};
