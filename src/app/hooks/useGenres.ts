import { useSuspenseQuery } from "@tanstack/react-query";
import type { ParentChildrenGenre } from "@/lib/types/data";
import { getGenres } from "../actions/server";

export const useGenres = () => {
  const result = useSuspenseQuery<ParentChildrenGenre[]>({
    queryKey: ["genres"],
    queryFn: () => getGenres(),
  });
  return result;
};
