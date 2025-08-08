"use client";

import { GameSection } from "@/components/GameSection";
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
      <GameSection games={hotGames} title="Hot Games" href="/games/hot" />
      <GameSection
        games={recommendedGames}
        title="Recommended Games"
        href="/games/recommended"
      />
    </div>
  );
}
