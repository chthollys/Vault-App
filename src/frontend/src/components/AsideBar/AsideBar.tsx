import type { ChildrenProp, CSSClassName } from "@/lib/types/props";
import cn from "@/lib/utils/cn";

import AsideBarSection from "./AsideBarSection";
import AsideBarLinks from "./AsideBarLinks";
import AsideBarLink from "./AsideBarLink";
import AsideBarCheckbox from "./AsideBarCheckbox";

type AsideBarProps = ChildrenProp & CSSClassName;

export default function AsideBar({ children, className }: AsideBarProps) {
  return (
    <aside
      className={cn(
        "bg-glass backdrop-blur-glass-strong border-glass shadow-glass static h-fit w-fit rounded-[1rem] border-[1px] border-solid p-6",
        className
      )}
    >
      {children}
    </aside>
  );
}

AsideBar.Section = AsideBarSection;
AsideBar.Links = AsideBarLinks;
AsideBar.Link = AsideBarLink;
AsideBar.Checkbox = AsideBarCheckbox;
