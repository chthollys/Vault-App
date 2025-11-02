import Image from "@/components/ImageOptimized";
import { GameCardWrapper } from "@/components/Wrapper";
import GameCoverWrapper from "@/components/Wrapper/GameCoverWrapper";
import DetailPriceSection from "./DetailPriceSection";
import UserActions from "./UserActions";
import type { GameInfoLeftSection } from "@/lib/types/props";

export default function GameInfoLeftSection({ game }: GameInfoLeftSection) {
  return (
    <GameCardWrapper className="flex min-h-[32rem] w-full max-w-[36rem] flex-col items-center p-6">
      <GameCoverWrapper className="relative mx-0 mt-0 mb-6 h-[300px] w-full overflow-hidden rounded-bl-sm">
        <Image
          src={game?.coverImageUrl}
          alt={`${game.title ?? "game"}-image`}
          className="h-full w-full rounded-xl rounded-br-sm object-cover !transition-none"
          preload
        />
      </GameCoverWrapper>

      <DetailPriceSection
        price={game.price}
        discountedPrice={game.discountedPrice}
      />
      <UserActions />
    </GameCardWrapper>
  );
}
