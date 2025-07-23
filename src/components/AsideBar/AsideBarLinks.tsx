import { LinkListProps } from "~/lib/definitions";
import LinkList from "@/UI/LinkSection/LinkList";
import classes from "./AsideBar.module.css";

export default function AsideBarLinks({ children }: LinkListProps) {
  return <LinkList className={classes["category-list"]}>{children}</LinkList>;
}
