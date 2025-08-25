import { SectionTitle } from "@/components/Typography";

export interface TitleSectionProps {
  title: string;
}

export default function TitleSection({ title }: TitleSectionProps) {
  return (
    <div className="mb-8">
      <SectionTitle>{title}</SectionTitle>
      <p className="mt-2 text-base text-white/70">Game Details & Information</p>
    </div>
  );
}
