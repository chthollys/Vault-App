import type { SortingRules } from "@/lib/types/utils";
import type { Game } from "@/lib/types/data";
import { getGames } from "../actions";
import { useQuery } from "@tanstack/react-query";

export const useGames = (sortRule?: SortingRules | null) => {
  const sortedCategory = sortRule?.categories
    ? [...sortRule.categories].sort()
    : null;
  const sortBy = sortRule?.sortBy ? [...sortRule.sortBy] : null;
  const result = useQuery<Game[]>({
    queryKey: ["games", sortedCategory, sortBy],
    queryFn: () => getGames(sortRule),
  });
  return result;
};
