import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getGamesPaginated } from "../actions";
import type { SortingRules } from "@/lib/types/utils";
import type { GamesInfinite } from "@/lib/types/data";

export const useGamesInfinite = (sortRule?: SortingRules | null) => {
  const sortedCategory = sortRule?.categories
    ? [...sortRule.categories].sort()
    : null;
  const sortBy = sortRule?.sortBy ? [...sortRule.sortBy] : null;

  return useSuspenseInfiniteQuery<GamesInfinite>({
    queryKey: ["games", sortedCategory, sortBy],
    queryFn: async ({ pageParam }) => {
      return await getGamesPaginated(sortRule, pageParam as number, 10);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length + 1 : undefined,
    staleTime: 1000 * 120,
  });
};
