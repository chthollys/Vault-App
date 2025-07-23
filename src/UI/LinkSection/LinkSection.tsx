import { LinkSectionProps } from "~/lib/definitions";
import LinkItem from "./LinkItem";
import LinkList from "./LinkList";

export default function LinkSection({
  label,
  labelClass,
  sectionClass,
  children,
}: LinkSectionProps) {
  return (
    <div className={sectionClass}>
      <h4 className={labelClass}>{label}</h4>
      {children}
    </div>
  );
}

LinkSection.LinkList = LinkList;
LinkSection.Link = LinkItem;
