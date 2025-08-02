import { ParagraphElementProps } from "@/lib/types/props";
import { twMerge } from "tailwind-merge";

export default function FeaturedTitle({
  className,
  children,
}: ParagraphElementProps) {
  let classes =
    "line-clamp-2 overflow-hidden text-[2.5rem] leading-[1.2] font-extrabold text-white";
  if (className) {
    classes = twMerge([classes, className]);
  }

  return <h2 className={classes}>{children}</h2>;
}
