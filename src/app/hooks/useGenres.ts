import { useQuery } from "@tanstack/react-query";
import type { ParentChildrenGenre } from "@/lib/types/data";
import { getGenres } from "../actions";

export const useGenres = () => {
  const result = useQuery<ParentChildrenGenre[]>({
    queryKey: ["genres"],
    queryFn: () => getGenres(),
  });
  return result;
};
