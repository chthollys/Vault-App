import { useSuspenseQuery } from "@tanstack/react-query";
import type { ParentChildrenGenre } from "@repo/types";
import { getNestedGenres } from "@/lib/db/client";

export const useGenres = () => {
  const result = useSuspenseQuery<ParentChildrenGenre[]>({
    queryKey: ["genres"],
    queryFn: () => getNestedGenres(),
  });
  return result;
};

export default useGenres;
