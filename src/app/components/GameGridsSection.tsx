"use client";

import GameGridSection from "@/components/GameGridSection/GameGridSection";
import { useGames } from "../hooks/useGames";
import { getRandomSubArray } from "@/lib/utils/utils";

export default function GameGridsSection() {
  const { data, isError, error } = useGames();

  if (isError || !data) {
    throw error;
  }

  const recommendedGames = getRandomSubArray(data, 5);
  const hotGames = getRandomSubArray(data, 5);

  return (
    <div>
      <GameGridSection games={hotGames} title="Hot Games" href="/games/hot" />
      <GameGridSection
        games={recommendedGames}
        title="Recommended Games"
        href="/games/recommended"
      />
    </div>
  );
}
