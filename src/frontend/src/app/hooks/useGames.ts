import type { SortingRules } from "@repo/types/src";
import type { Game } from "@repo/types/src";
import { getGames } from "../actions/db.action";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGames = (sortRule?: SortingRules | null) => {
  const sortedCategory = sortRule?.categories
    ? [...sortRule.categories].sort()
    : null;
  const sortBy = sortRule?.sortBy ? [...sortRule.sortBy] : null;
  return useSuspenseQuery<Game[]>({
    queryKey: ["games", sortedCategory, sortBy],
    queryFn: () => getGames(sortRule),
    staleTime: 1000 * 120,
  });
};
