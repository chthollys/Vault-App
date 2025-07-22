import { ChildrenProps } from "~/lib/definitions";
import classes from "./AsideBar.module.css";

export interface AsideBarSectionProps extends ChildrenProps {
  label: string;
}

export default function AsideBarSection({
  label,
  children,
}: AsideBarSectionProps) {
  return (
    <div className={classes["category-section"]}>
      <h4 className={classes["category-main"]}>{label}</h4>
      {children}
    </div>
  );
}
