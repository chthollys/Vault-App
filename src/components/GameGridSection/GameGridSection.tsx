import { GameSectionProps } from "@/lib/types/props";
import GameSectionHeader from "./GameSectionHeader";
import GamesGrid from "./GamesGrid";

export default function GameSection({
  title,
  label = "View All",
  href,
  games,
}: GameSectionProps) {
  return (
    <section className="mb-12" aria-labelledby={`${label}-section-title`}>
      <GameSectionHeader title={title} href={href} label={label} />

      <GamesGrid title={title} games={games} />
    </section>
  );
}
