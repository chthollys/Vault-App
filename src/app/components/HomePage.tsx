"use client";

import { useMemo } from "react";
import { useGames } from "../hooks/useGames";
import { getRandomSubArray } from "@/lib/utils/utils";
import { LoadingSpinner } from "@/UI/Spinner";
import FeaturedGames from "./FeaturedGames";
import GameGridsSection from "./GameGridsSection";

export default function HomePage() {
  const { data: games, isError, isPending, error } = useGames();

  const featuredGames = useMemo(
    () => (games ? getRandomSubArray(games, 5) : []),
    [games]
  );
  const hotGames = useMemo(
    () => (games ? getRandomSubArray(games, 5) : []),
    [games]
  );
  const recommendedGames = useMemo(
    () => (games ? getRandomSubArray(games, 5) : []),
    [games]
  );

  if (isPending) return <LoadingSpinner />;
  if (isError)
    throw error || new Error("An error occurred while fetching games.");
  if (!games) return null;

  return (
    <>
      <FeaturedGames games={featuredGames} />
      <GameGridsSection
        hotGames={hotGames}
        recommendedGames={recommendedGames}
      />
    </>
  );
}
