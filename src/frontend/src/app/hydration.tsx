import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/utils/get-query-client";
import {
  getGames,
  getGamesPaginated,
  getNestedGenres,
} from "../lib/api/server";
import type { HydrationProps } from "@/lib/types/props";
import {
  GAME_INFINITE_PERPAGE,
  GAMES_INFINITES_BASEQUERYKEY,
  CURRENTUSER_BASEQUERYKEY,
  GAMES_BASEQUERYKEY,
  GENRES_BASEQUERYKEY,
} from "@/lib/constants";
import { fetchCurrentUser } from "@/lib/auth-server";

export default async function Hydration({ children }: HydrationProps) {
  const queryClient = getQueryClient();
  await Promise.all([
    // Prefetch current user session
    queryClient.prefetchQuery({
      queryKey: CURRENTUSER_BASEQUERYKEY,
      queryFn: fetchCurrentUser,
    }),
    // Prefetch Games
    queryClient.prefetchQuery({
      queryKey: GAMES_BASEQUERYKEY,
      queryFn: () => getGames(null),
    }),
    // Prefetch Genres
    queryClient.prefetchQuery({
      queryKey: GENRES_BASEQUERYKEY,
      queryFn: getNestedGenres,
    }),
    // Prefetch Paginated Games
    queryClient.prefetchInfiniteQuery({
      queryKey: GAMES_INFINITES_BASEQUERYKEY,
      queryFn: ({ pageParam = 0 }) =>
        getGamesPaginated(null, pageParam as number, GAME_INFINITE_PERPAGE),
      initialPageParam: 0,
    }),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}
