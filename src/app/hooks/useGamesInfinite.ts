import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getGamesPaginated } from "../actions";
import type { SortingRules } from "@/lib/types/utils";
import type { GamesInfinite } from "@/lib/types/data";

export const useGamesInfinite = (
  sortRule?: SortingRules | null,
  perPage = 10
) => {
  const sortedCategory = sortRule?.categories
    ? [...sortRule.categories].sort()
    : null;
  const sortBy = sortRule?.sortBy ? [...sortRule.sortBy] : null;

  return useSuspenseInfiniteQuery<GamesInfinite>({
    queryKey: ["games", "infinite", sortedCategory, sortBy],
    queryFn: ({ pageParam = 0 }) =>
      getGamesPaginated(sortRule, pageParam as number, perPage),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length : undefined,
    initialPageParam: 0,
  });
};
