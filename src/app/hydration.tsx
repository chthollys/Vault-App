import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/utils/get-query-client";
import { getGames, getGenres } from "./actions";
import type { ChildrenProp } from "@/lib/types/props";

export default async function Hydration({ children }: ChildrenProp) {
  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["games"],
      queryFn: () => getGames(),
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
