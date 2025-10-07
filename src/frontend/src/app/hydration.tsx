import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/utils/get-query-client";
import { getGames, getGamesPaginated, getNestedGenres } from "../lib/db/server";
import type { HydrationProps } from "@/lib/types/props";
import {
  DEFAULT_CATEGORIES,
  DEFAULT_SORTBY,
  GAME_INFINITE_PERPAGE,
} from "@/lib/utils/constants";

export default async function Hydration({ children }: HydrationProps) {
  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["games", DEFAULT_CATEGORIES, DEFAULT_SORTBY],
      queryFn: () => getGames(null),
    }),
    queryClient.prefetchQuery({
      queryKey: ["genres"],
      queryFn: getNestedGenres,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ["games", "infinite", DEFAULT_CATEGORIES, DEFAULT_SORTBY],
      queryFn: ({ pageParam = 0 }) =>
        getGamesPaginated(null, pageParam as number, GAME_INFINITE_PERPAGE),
      initialPageParam: 0,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
