import type { DivElementProps } from "@/lib/types/props";
import Wrapper from "./base/Wrapper";

export default function GameCardWrapper({
  children,
  className,
  ...props
}: DivElementProps) {
  const baseClass =
    "bg-glass border-glass shadow-glass relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border-[1px] border-solid p-0 backdrop-blur-2xl";
  return (
    <>
      <Wrapper className={baseClass} nextClass={className} {...props}>
        {children}
      </Wrapper>
    </>
  );
}
