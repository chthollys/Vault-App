"use client";

import { useMemo } from "react";
import { useGames } from "../hooks/useGames";
import { getRandomSubArray } from "@/lib/utils/utils";
import FeaturedGames from "./FeaturedGames";
import GameGridsSection from "./GameGridsSection";

export default function HomePage() {
  const { data: games } = useGames();

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
