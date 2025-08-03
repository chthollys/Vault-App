import Image from "next/image";
import GameCardWrapper from "@/components/Wrapper/GameCardWrapper";
import GameCoverWrapper from "@/components/Wrapper/GameCoverWrapper";
import DetailPriceSection from "./DetailPriceSection";
import UserActions from "./UserActions";
import gameImg from "~/assets/images/eldenRing.png";

export default function LeftSection() {
  return (
    <div className="flex flex-col">
      <GameCardWrapper className="flex h-fit flex-col p-6">
        <GameCoverWrapper className="relative mx-0 mt-0 mb-6 h-auto w-full overflow-hidden rounded-xl">
          <Image
            src={gameImg}
            alt={"GAME IMAGE ALT"}
            className="h-full w-full object-cover !transition-none"
          />
        </GameCoverWrapper>

        <DetailPriceSection />
        <UserActions />
      </GameCardWrapper>
    </div>
  );
}
