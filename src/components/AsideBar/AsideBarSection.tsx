import LinkSection from "@/UI/LinkSection/LinkSection";
import { LinkSectionProps } from "@/lib/definitions";

import classes from "./AsideBar.module.css";

export default function AsideBarSection({ children, label }: LinkSectionProps) {
  return (
    <LinkSection
      sectionClass={classes["category-section"]}
      labelClass={classes["category-main"]}
      label={label}
    >
      {children}
    </LinkSection>
  );
}
