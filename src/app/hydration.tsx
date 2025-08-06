import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/utils/get-query-client";
import { getGames } from "./actions";
import type { ChildrenProp } from "@/lib/types/props";

export default async function Hydration({ children }: ChildrenProp) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["games"],
    queryFn: getGames,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
