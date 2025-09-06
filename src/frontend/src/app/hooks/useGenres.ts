import { useSuspenseQuery } from "@tanstack/react-query";
import type { ParentChildrenGenre } from "repo/types";
import { getGenres } from "../actions/db.action";

export const useGenres = () => {
  const result = useSuspenseQuery<ParentChildrenGenre[]>({
    queryKey: ["genres"],
    queryFn: () => getGenres(),
  });
  return result;
};
