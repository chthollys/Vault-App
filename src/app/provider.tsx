"use client";

import { ChildrenProp } from "@/lib/definitions";
import { getQueryClient } from "@/lib/utils/get-query-client";
import { QueryClientProvider } from "@tanstack/react-query";

export default function Provider({ children }: ChildrenProp) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
