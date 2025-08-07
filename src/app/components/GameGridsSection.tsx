"use client";

import GameGridSection from "@/components/GameGridSection/GameGridSection";
import { useGames } from "../hooks/useGames";
import { getRandomSubArray } from "@/lib/utils/utils";
import { useMemo } from "react";

export default function GameGridsSection() {
  const { data, isError, error } = useGames();

  if (isError || !data) {
    throw error;
  }

  const recommendedGames = useMemo(() => getRandomSubArray(data, 5), [data]);
  const hotGames = useMemo(() => getRandomSubArray(data, 5), [data]);

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
