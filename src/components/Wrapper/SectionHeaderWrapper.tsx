import Wrapper from "./base/Wrapper";
import type { DivElementProps } from "@/lib/types/props";

export default function SectionHeaderWrapper({
  className,
  children,
  ...props
}: DivElementProps) {
  const baseClass =
    "bg-glass border-glass shadow-glass mb-8 flex items-center justify-between rounded-2xl border-[1px] border-solid p-6 backdrop-blur-[20px]";
  return (
    <Wrapper className={baseClass} nextClass={className} {...props}>
      {children}
    </Wrapper>
  );
}
