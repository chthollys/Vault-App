import { getSignupStep } from "@/lib/db/server";
import type { ChildrenProp } from "@/lib/types/props";
import { getQueryClient } from "@/lib/utils/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Hydration({ children }: ChildrenProp) {
  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["signup-step"],
      queryFn: getSignupStep,
    }),
  ]);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}
