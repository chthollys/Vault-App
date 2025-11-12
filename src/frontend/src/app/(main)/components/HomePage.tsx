"use client";

import type { Game } from "@repo/types";
import { useState, useEffect } from "react";
import useGames from "@/app/hooks/useGames";
import { getRandomSubArray } from "@/lib/utils";
import FeaturedGames from "./FeaturedGames";
import GameGridsSection from "./GameGridsSection";
import Loading from "@/app/loading";

export default function HomePage() {
  const { data: games } = useGames();

  const [featuredGames, setFeaturedGames] = useState<Game[] | null>(null);
  const [hotGames, setHotGames] = useState<Game[] | null>(null);
  const [recommendedGames, setRecommendedGames] = useState<Game[] | null>(null);

  useEffect(() => {
    if (games && games.length > 0) {
      setFeaturedGames(getRandomSubArray(games, 5));
      setHotGames(getRandomSubArray(games, 5));
      setRecommendedGames(getRandomSubArray(games, 5));
    }
  }, [games]);

  return (
    <div>
      {featuredGames ? <FeaturedGames games={featuredGames} /> : <Loading />}
      {recommendedGames && hotGames ? (
        <>
          <GameGridsSection
            hotGames={hotGames}
            recommendedGames={recommendedGames}
          />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
