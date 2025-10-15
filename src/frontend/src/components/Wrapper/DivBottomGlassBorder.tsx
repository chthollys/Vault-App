import type { DivElementProps } from "@/lib/types/props";
import { Wrapper } from "./base";

export default function DivBottomGlassBorder({
  className,
  children,
}: DivElementProps) {
  return (
    <Wrapper
      nextClass={className}
      className="mb-8 flex flex-col border-b-[1px] border-solid border-b-white/10 pb-6 text-left"
    >
      {children}
    </Wrapper>
  );
}
