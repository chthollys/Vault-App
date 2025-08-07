import { useQuery } from "@tanstack/react-query";
import { Game } from "@/lib/types/data";
import { getGames } from "../actions";

export const useGames = (categories?: string[] | null) => {
  const sortedCategory = categories ? [...categories].sort() : null;
  const result = useQuery<Game[]>({
    queryKey: sortedCategory ? ["games", sortedCategory] : ["games"],
    queryFn: () => getGames(categories),
  });
  return result;
};
