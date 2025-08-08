"use client";

import { useGames } from "@/app/hooks/useGames";
import GamesGrid from "@/components/GameSection/GamesGrid";
import { getValuesByParams } from "@/lib/utils/utils";
import { LoadingSpinner } from "@/UI/Spinner";
import { useSearchParams } from "next/navigation";

export default function MainGrid() {
  const searchParams = useSearchParams();
  const categories = getValuesByParams(searchParams, "category");
  const { data, isPending, isError, error } = useGames(categories);

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
