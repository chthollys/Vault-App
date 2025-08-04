import Image from "next/image";
import GameCardWrapper from "@/components/Wrapper/GameCardWrapper";
import GameCoverWrapper from "@/components/Wrapper/GameCoverWrapper";
import DetailPriceSection from "./DetailPriceSection";
import UserActions from "./UserActions";
import { Game } from "@/lib/types/data";

export interface GameInfoLeftSection {
  game: Game;
}

export default function GameInfoLeftSection({ game }: GameInfoLeftSection) {
  return (
    <div className="flex flex-col">
      <GameCardWrapper className="flex h-fit flex-col p-6">
        <GameCoverWrapper className="relative mx-0 mt-0 mb-6 h-[300px] w-[400px] overflow-hidden rounded-bl-sm">
          <Image
            src={game?.coverImageUrl}
            alt={"GAME IMAGE ALT"}
            fill
            className="h-full w-full rounded-xl rounded-br-sm object-cover !transition-none"
          />
        </GameCoverWrapper>

        <DetailPriceSection price={game.price} />
        <UserActions />
      </GameCardWrapper>
    </div>
  );
}
