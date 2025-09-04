import type { DivElementProps } from "@/lib/types/props";
import { Wrapper } from "@/components/Wrapper/base";

export default function GameCardWrapperWithHover({
  children,
  className,
  ...props
}: DivElementProps) {
  const baseClass =
    "bg-glass border-glass shadow-glass relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border-[1px] border-solid p-0 backdrop-blur-2xl group/game-card hover:bg-glass-hover transition-(--transition-normal) hover:-translate-y-2 hover:border-black/15 hover:shadow-[0_20px_60px_rgba(0,_0,_0,_0.4)]";
  return (
    <>
      <Wrapper className={baseClass} nextClass={className} {...props}>
        {children}
      </Wrapper>
    </>
  );
}
