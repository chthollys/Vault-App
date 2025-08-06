import type { Game } from "@/lib/types/data";
import GameInfoLeftSection from "./GameInfoLeftSection";
import GameInfoRightSection from "./GameInfoRightSection";

export interface GameInfoSectionProps {
  game: Game;
}

export default function GameInfoSection({ game }: GameInfoSectionProps) {
  return (
    <div className="mb-2xl mb-8 grid w-full items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
      {/* LEFT SIDE: GAME COVER + PRICE + BUTTONS */}
      <GameInfoLeftSection game={game} />

      {/** RIGHT SIDE: GAME INFO + DESCRIPTION + RATING + RECENT REVIEWS */}
      <GameInfoRightSection game={game} />
    </div>
  );
}
