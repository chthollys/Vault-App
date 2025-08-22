"use client";

import Loading from "@/app/loading";
import GamesInfiniteGrid from "@/components/GameSection/GamesInfiniteGrid";
import { getValuesByParams } from "@/lib/utils/utils";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import type { SortingRules } from "@/lib/types/utils";

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
