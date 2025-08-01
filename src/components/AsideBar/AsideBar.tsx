import { ChildrenProp } from "@/lib/definitions";

import AsideBarSection from "./AsideBarSection";
import AsideBarLinks from "./AsideBarLinks";
import AsideBarLink from "./AsideBarLink";

export default function AsideBar({ children }: ChildrenProp) {
  return (
    <aside className="bg-glass backdrop-blur-glass-strong border-glass shadow-glass static h-fit w-fit rounded-[1rem] border-[1px] border-solid p-6">
      {children}
    </aside>
  );
}

AsideBar.Section = AsideBarSection;
AsideBar.Links = AsideBarLinks;
AsideBar.Link = AsideBarLink;
