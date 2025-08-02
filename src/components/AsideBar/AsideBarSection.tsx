import LinkSection from "@/UI/LinkSection/LinkSection";
import { LinkSectionProps } from "@/lib/types/props";

export default function AsideBarSection({ children, label }: LinkSectionProps) {
  return (
    <LinkSection
      sectionClass="mb-6"
      labelClass="text-primary-light border-glass mb-4 border-b-[1px] border-solid pb-2 text-[0.9rem] font-semibold tracking-wider uppercase"
      label={label}
    >
      {children}
    </LinkSection>
  );
}
