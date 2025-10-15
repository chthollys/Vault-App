import { GameCardWrapper } from "@/components/Wrapper";
import GameInfoDetail from "./GameInfoDetail";
import DescriptionSection from "./Description";
import RatingSection from "./RatingSection";
import type { Game } from "@repo/types";
import { getGenresByGameId, getReviewsByGameId } from "@/lib/db/server";

export interface GameInfoRightSection {
  game: Game;
}

export default async function GameInfoRightSection({
  game,
}: GameInfoRightSection) {
  const genres = await getGenresByGameId(game.id);
  const reviews = await getReviewsByGameId(game.id);

  return (
    <GameCardWrapper className="flex min-h-[32rem] w-auto flex-col p-[2em]">
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
  );
}
