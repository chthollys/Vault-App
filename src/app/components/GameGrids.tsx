"use client";

import GameSection from "@/components/GameSection/GameSection";
import { useGames } from "../hooks/useGames";

export default function GameGrids() {
  const { data, isError, error } = useGames();

  if (isError || !data) {
    throw error;
  }

  return (
    <GameSection
      games={data}
      title="Recommended Games"
      href="/games/recommended"
    />
  );
}
