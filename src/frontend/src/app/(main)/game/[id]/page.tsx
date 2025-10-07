import { notFound } from "next/navigation";
import TitleSection from "./components/TitleSection";
import GameInfoSection from "./components/GameInfoSection";
import GameReviewSection from "./components/GameReviewSection";
import type { GamePageProps } from "@/lib/types/props";
import { getGame } from "@/lib/db/server";

export default async function GamePage({ params }: GamePageProps) {
  const { id } = await params;
  const game = await getGame(id);

  if (!game) {
    notFound();
  }

  return (
    <>
      <div className="min-w-[560px]">
        <TitleSection title={game.title} />
        <GameInfoSection game={game} />
        <GameReviewSection gameId={id} />
      </div>
    </>
  );
}
