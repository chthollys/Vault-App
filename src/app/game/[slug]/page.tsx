import { notFound } from "next/navigation";
import TitleSection from "./components/TitleSection";
import GameInfoSection from "./components/GameDetailSection";
import GameReviewSection from "./components/GameReviewSection";
import { GamePageProps } from "@/lib/types/props";
import { getGame } from "@/app/actions";

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = await params;
  const game = await getGame(slug);

  if (!game) {
    notFound();
  }

  return (
    <>
      <div className="min-w-0">
        <TitleSection title={game.title} />
        <GameInfoSection />
        <GameReviewSection />
      </div>
    </>
  );
}
