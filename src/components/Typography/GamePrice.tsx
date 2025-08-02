import { SpanElementProps } from "@/lib/types/props";
import { twMerge } from "tailwind-merge";

export default function GamePrice({
  className,
  children,
  ...props
}: SpanElementProps) {
  let baseClasses = "text-accent-light text-[1.1rem] font-semibold";
  if (className) {
    baseClasses = twMerge([baseClasses, className]);
  }
  return (
    <span className={baseClasses} {...props}>
      {children}
    </span>
  );
}
