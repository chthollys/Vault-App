import { SectionTitle } from "@/components/Typography";
import { BreadcrumbsNav } from "@/UI/breadcrumb";

export interface TitleSectionProps {
  title: string;
}

export default function TitleSection({ title }: TitleSectionProps) {
  return (
    <div className="mb-8">
      <div className="mb-2">
        <BreadcrumbsNav currentLabel=" " />
      </div>
      <SectionTitle>{title}</SectionTitle>
      <p className="mt-2 text-base text-white/70">Game Details & Information</p>
    </div>
  );
}
