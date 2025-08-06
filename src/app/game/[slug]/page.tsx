import { notFound } from "next/navigation";
import TitleSection from "./components/TitleSection";
import GameInfoSection from "./components/GameInfoSection";
import GameReviewSection from "./components/GameReviewSection";
import type { GamePageProps } from "@/lib/types/props";
import { getGame, getReviewByGameId } from "@/app/actions";

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = await params;
  const game = await getGame(slug);
  const reviews = await getReviewByGameId(slug);

  if (!game) {
    notFound();
  }

  return (
    <>
      <div className="min-w-[560px]">
        <TitleSection title={game.title} />
        <GameInfoSection game={game} />
        <GameReviewSection reviews={reviews} />
      </div>
    </>
  );
}
