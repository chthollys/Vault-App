import { ChildrenProp } from "@/lib/definitions";

import AsideBarSection from "./AsideBarSection";
import AsideBarLinks from "./AsideBarLinks";
import AsideBarLink from "./AsideBarLink";
import classes from "./AsideBar.module.css";

export default function AsideBar({ children }: ChildrenProp) {
  return <aside className={classes["categories-sidebar"]}>{children}</aside>;
}

AsideBar.Section = AsideBarSection;
AsideBar.Links = AsideBarLinks;
AsideBar.Link = AsideBarLink;
