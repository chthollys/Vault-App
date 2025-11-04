import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/utils/get-query-client";
import {
  getCart,
  getGames,
  getGamesPaginated,
  getNestedGenres,
} from "../lib/db/server";
import type { HydrationProps } from "@/lib/types/props";
import {
  DEFAULT_CATEGORIES,
  DEFAULT_SORTBY,
  GAME_INFINITE_PERPAGE,
} from "@/lib/utils/constants";
import { fetchCurrentUser } from "@/lib/auth-server";

export default async function Hydration({ children }: HydrationProps) {
  const queryClient = getQueryClient();
  await Promise.all([
    // Prefetch current user session
    queryClient.prefetchQuery({
      queryKey: ["user"],
      queryFn: fetchCurrentUser,
    }),
    // Prefetch Games
    queryClient.prefetchQuery({
      queryKey: ["games", DEFAULT_CATEGORIES, DEFAULT_SORTBY],
      queryFn: () => getGames(null),
    }),
    // Prefetch Genres
    queryClient.prefetchQuery({
      queryKey: ["genres"],
      queryFn: getNestedGenres,
    }),
    // Prefetch Cart for current user
    queryClient.prefetchQuery({
      queryKey: ["cart"],
      queryFn: getCart,
    }),
    // Prefetch Paginated Games
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
