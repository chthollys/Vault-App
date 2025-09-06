import { GameCardWrapper } from "@/components/Wrapper";
import GameInfoDetail from "./GameInfoDetail";
import DescriptionSection from "./Description";
import RatingSection from "./RatingSection";
import type { Game } from "@repo/types/src";
import { getGenreByGameId, getReviewByGameId } from "@/app/actions/db.action";

export interface GameInfoRightSection {
  game: Game;
}

export default async function GameInfoRightSection({
  game,
}: GameInfoRightSection) {
  const genres = await getGenreByGameId(game.id);
  const reviews = await getReviewByGameId(game.id);

  return (
    <div className="flex w-auto flex-col">
      <GameCardWrapper className="h-fit p-[2em]">
        <GameInfoDetail
          name={game.title}
          genres={genres}
          publisher={game.publisher}
          developer={game.developer}
        />
        <DescriptionSection
          title="About This Game"
          description={game.description}
        />
        <RatingSection rating={game.rating} count={reviews.length} />
      </GameCardWrapper>
    </div>
  );
}
