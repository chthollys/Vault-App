"use client";

import { useQuery } from "@tanstack/react-query";
import { getGames } from "./actions";
import FeaturedGame from "@/components/FeaturedGame.tsx/FeaturedGame";
import GameSection from "@/components/GameSection/GameSection";
import { Game } from "@/lib/definitions";

interface PageContentProps {
  initialGames: Game[];
}

export default function PageContent({ initialGames }: PageContentProps) {
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["games"],
    queryFn: getGames,
    initialData: initialGames,
  });

  if (isFetching) {
    return (
      <p className="text-lg font-bold tracking-wider text-white">
        Loading Games...
      </p>
    );
  }

  if (isError) {
    console.error(error);
    throw error;
  }

  return (
    <div className="min-w-0">
      <FeaturedGame />
      <GameSection
        games={data}
        title="Recommended Games"
        href="/games/recommended"
      />
    </div>
  );
}
