import { useQuery } from "@tanstack/react-query";
import { Game } from "@/lib/types/data";
import { getGames } from "../actions";

export const useGames = () => {
  return useQuery<Game[]>({
    queryKey: ["games"],
    queryFn: getGames,
  });
};
