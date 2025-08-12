"use client";

import { useGames } from "@/app/hooks/useGames";
import GamesGrid from "@/components/GameSection/GamesGrid";
import type { SortingRules } from "@/lib/types/utils";
import { getValuesByParams } from "@/lib/utils/utils";
import { LoadingSpinner } from "@/UI/Spinner";
import { useSearchParams } from "next/navigation";

export default function MainGrid() {
  const searchParams = useSearchParams();
  const sortRules: SortingRules = {
    categories: getValuesByParams(searchParams, "category"),
    sortBy: getValuesByParams(searchParams, "sortBy"),
  };
  const { data, isPending, isError, error } = useGames(sortRules);

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError || !data) {
    throw error || Error("Error occurred");
  }

  return (
    <>
      <GamesGrid title="All games" games={data} />
    </>
  );
}
