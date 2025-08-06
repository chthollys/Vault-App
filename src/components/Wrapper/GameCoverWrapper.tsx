import type { DivElementProps } from "@/lib/types/props";
import Wrapper from "./base/Wrapper";

export default function GameCoverWrapper({
  children,
  className,
  ...props
}: DivElementProps) {
  const baseClass = "relative h-[200px] overflow-hidden";
  return (
    <Wrapper className={baseClass} nextClass={className} {...props}>
      {children}
    </Wrapper>
  );
}
