"use client";

import { HeroUIProvider } from "@heroui/react";
import { ChildrenProp } from "@/lib/types/props";
import { getQueryClient } from "@/lib/utils/get-query-client";
import { QueryClientProvider } from "@tanstack/react-query";

export default function Provider({ children }: ChildrenProp) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>{children}</HeroUIProvider>
    </QueryClientProvider>
  );
}
