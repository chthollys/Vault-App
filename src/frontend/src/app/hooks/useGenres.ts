import { useSuspenseQuery } from "@tanstack/react-query";
import type { ParentChildrenGenre } from "@repo/types";
import { getNestedGenres } from "@/lib/api/client";
import { GENRES_BASEQUERYKEY as queryKey } from "@/lib/constants";

export const useGenres = () => {
  const result = useSuspenseQuery<ParentChildrenGenre[]>({
    queryKey,
    queryFn: () => getNestedGenres(),
  });
  return result;
};

export default useGenres;
