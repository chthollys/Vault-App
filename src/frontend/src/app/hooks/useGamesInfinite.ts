import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getGamesPaginated } from "@/lib/db/client";
import type { GamesQuery } from "@repo/types";
import type { GamesInfinite } from "@repo/types";
import {
  DEFAULT_CATEGORIES,
  DEFAULT_SORTBY,
  GAME_INFINITE_PERPAGE,
} from "@/lib/utils/constants";

export const useGamesInfinite = (
  sortRule?: GamesQuery | null,
  perPage = GAME_INFINITE_PERPAGE
) => {
  const sortedCategory = sortRule?.categories
    ? [...sortRule.categories].sort()
    : DEFAULT_CATEGORIES;
  const sortBy = sortRule?.sortBy ? [...sortRule.sortBy] : DEFAULT_SORTBY;
  return useSuspenseInfiniteQuery<GamesInfinite>({
    queryKey: ["games", "infinite", sortedCategory, sortBy],
    queryFn: ({ pageParam = 0 }) =>
      getGamesPaginated(sortRule, pageParam as number, perPage),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length : undefined,
    initialPageParam: 0,
  });
};
