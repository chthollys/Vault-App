import type { GamesQuery } from "repo/types";
import type { Game } from "repo/types";
import { getGames } from "../actions/api.client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGames = (sortRule?: GamesQuery | null) => {
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
