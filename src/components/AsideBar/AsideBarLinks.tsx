import { ChildrenProps } from "~/lib/definitions";
import classes from "./AsideBar.module.css";

export default function AsideBarLinks({ children }: ChildrenProps) {
  return <ul className={classes["category-list"]}>{children}</ul>;
}
