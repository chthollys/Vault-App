import { twMerge } from "tailwind-merge";
import { WrapperProps } from "@/lib/types/props";
import { ElementType } from "react";

export default function Wrapper<T extends ElementType = "div">({
  as,
  className,
  nextClass,
  children,
  ...props
}: WrapperProps<T>) {
  const Component = as || "div";
  let classes = className as string;
  if (nextClass) {
    classes = twMerge([classes, nextClass]);
  }
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
