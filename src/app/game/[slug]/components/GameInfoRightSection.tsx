import GameCardWrapper from "@/components/Wrapper/GameCardWrapper";
import GameInfoDetail from "./GameInfoDetail";
import DescriptionSection from "./Description";
import RatingSection from "./RatingSection";
import RecentReview from "./RecentReview";
import { Game } from "@/lib/types/data";
import { getGenreByGameId } from "@/app/actions";

export interface GameInfoRightSection {
  game: Game;
}

export default async function GameInfoRightSection({
  game,
}: GameInfoRightSection) {
  const genres = await getGenreByGameId(game.id);

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
        <RatingSection rating={game.rating} comment={"test"} />

        {/** RECENT RATING AND REVIEW IF EXIST*/}
        <RecentReview />
      </GameCardWrapper>
    </div>
  );
}
