"use client";

import Loading from "@/app/loading";
import GamesInfiniteGrid from "@/components/GameSection/GamesInfiniteGrid";
import { getValuesByParams } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import type { SortingRules } from "@repo/types/src";

export default function MainGrid() {
  const searchParams = useSearchParams();
  const sortRules: SortingRules = {
    categories: getValuesByParams(searchParams, "category"),
    sortBy: getValuesByParams(searchParams, "sortBy"),
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <GamesInfiniteGrid sortRule={sortRules} />
      </Suspense>
    </>
  );
}
