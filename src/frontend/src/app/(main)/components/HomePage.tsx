"use client";

import type { Game } from "@repo/types";
import { useState, useEffect } from "react";
import { useGames } from "@/app/hooks/useGames";
import { getRandomSubArray } from "@/lib/utils";
import FeaturedGames from "./FeaturedGames";
import GameGridsSection from "./GameGridsSection";

export default function HomePage() {
  const { data: games } = useGames();

  const [featuredGames, setFeaturedGames] = useState<Game[]>([]);
  const [hotGames, setHotGames] = useState<Game[]>([]);
  const [recommendedGames, setRecommendedGames] = useState<Game[]>([]);

  useEffect(() => {
    if (games && games.length > 0) {
      setFeaturedGames(getRandomSubArray(games, 5));
      setHotGames(getRandomSubArray(games, 5));
      setRecommendedGames(getRandomSubArray(games, 5));
    }
  }, [games]);

  return (
    <div>
      <FeaturedGames games={featuredGames} />
      <GameGridsSection
        hotGames={hotGames}
        recommendedGames={recommendedGames}
      />
    </div>
  );
}
