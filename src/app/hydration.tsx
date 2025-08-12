import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/utils/get-query-client";
import { getGames, getGenres } from "./actions";
import type { HydrationProps } from "@/lib/types/props";

const sortRules = {
  categories: [],
  sortBy: null,
};

export default async function Hydration({ children }: HydrationProps) {
  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["games", sortRules.categories, sortRules.sortBy],
      queryFn: () => getGames(sortRules),
    }),
    queryClient.prefetchQuery({
      queryKey: ["genres"],
      queryFn: getGenres,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
