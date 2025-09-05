import type { DivElementProps } from "@/lib/types/props";
import { Wrapper } from "./base";

export default function GameCardInfoWrapper({
  className,
  children,
  ...props
}: DivElementProps) {
  return (
    <Wrapper
      className="flex flex-1 flex-col p-6"
      nextClass={className}
      {...props}
    >
      {children}
    </Wrapper>
  );
}
