"use client";

import { useGames } from "@/app/hooks/useGames";
import GamesInfiniteGrid from "@/components/GameSection/GamesInfiniteGrid";
import type { SortingRules } from "@/lib/types/utils";
import { getValuesByParams } from "@/lib/utils/utils";
import { useSearchParams } from "next/navigation";

export default function MainGrid() {
  const searchParams = useSearchParams();
  const sortRules: SortingRules = {
    categories: getValuesByParams(searchParams, "category"),
    sortBy: getValuesByParams(searchParams, "sortBy"),
  };

  const { data } = useGames(sortRules);

  return (
    <>
      <GamesInfiniteGrid />
    </>
  );
}
