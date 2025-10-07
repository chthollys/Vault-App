import type { GamesQuery } from "@repo/types";
import type { Game } from "@repo/types";
import { getGames } from "@/lib/db/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DEFAULT_CATEGORIES, DEFAULT_SORTBY } from "@/lib/utils/constants";

export const useGames = (sortRule?: GamesQuery | null) => {
  const sortedCategory = sortRule?.categories
    ? [...sortRule.categories].sort()
    : DEFAULT_CATEGORIES;
  const sortBy = sortRule?.sortBy ? [...sortRule.sortBy] : DEFAULT_SORTBY;
  return useSuspenseQuery<Game[]>({
    queryKey: ["games", sortedCategory, sortBy],
    queryFn: () => getGames(sortRule),
    staleTime: 1000 * 120,
  });
};
