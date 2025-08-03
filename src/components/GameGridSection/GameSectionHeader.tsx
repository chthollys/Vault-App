import Link from "next/link";
import SectionHeaderWrapper from "../Wrapper/SectionHeaderWrapper";
import GridButton from "@/UI/buttons/GridButton";
import { GameSectionHeaderProps } from "@/lib/types/props";

export default function GameSectionHeader({
  title,
  label,
  href,
}: GameSectionHeaderProps) {
  return (
    <SectionHeaderWrapper>
      <h2
        className="m-0 text-3xl font-bold text-white/90"
        id="recommended-title"
      >
        {title}
      </h2>

      <Link href={href}>
        <GridButton aria-label={`${label} ${title}`}>{label}</GridButton>
      </Link>
    </SectionHeaderWrapper>
  );
}
