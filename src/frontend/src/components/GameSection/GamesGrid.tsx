import type { GamesGridProps } from "@/lib/types/props";
import Link from "next/link";
import GameCard from "./GameCard";
import { Wrapper } from "@/components/Wrapper/base";
import { SectionTitle } from "../Typography";
import { PurpleButton } from "@/UI/buttons";
import { AmoungUsRed } from "@/UI/icons";

export default function GamesGrid({ games, title }: GamesGridProps) {
  if (!games) {
    return <p>Failed to fetch games</p>;
  }

  if (games.length < 1) {
    return (
      <div className="mx-auto flex w-fit flex-col items-center gap-4">
        <AmoungUsRed />
        <SectionTitle>Games not found</SectionTitle>
        <Link href={"/games/all"} className="underline">
          <PurpleButton className="text-xl">Back to all games</PurpleButton>
        </Link>
      </div>
    );
  }

  return (
    <Wrapper
      as="div"
      className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-6"
      role="list"
      aria-label={`${title ?? "games"} list`}
    >
      {games.map((game, index) => (
        <GameCard key={index} game={game} />
      ))}
    </Wrapper>
  );
}
