"use client";

import { HeroUIProvider } from "@heroui/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { ChildrenProp } from "@/lib/types/props";
import { getQueryClient } from "@/lib/utils/get-query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import ToastProvider from "@/components/ToastProvider";
import { useRouter } from "next/navigation";

export default function Provider({ children }: ChildrenProp) {
  const queryClient = getQueryClient();
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider navigate={router.push}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ToastProvider />
          {children}
        </AppRouterCacheProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  );
}
