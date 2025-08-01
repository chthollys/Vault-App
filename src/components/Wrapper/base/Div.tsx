import { DivElementProps } from "@/lib/definitions";
import { twMerge } from "tailwind-merge";

export interface DivWrapperProps extends DivElementProps {
  nextClass?: string | undefined;
}

export default function DivWrapper({
  className,
  nextClass,
  children,
  ...props
}: DivWrapperProps) {
  let classes = className;
  if (nextClass) {
    classes = twMerge([className, nextClass]);
  }
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
