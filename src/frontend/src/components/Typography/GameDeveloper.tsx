import type { ParagraphElementProps } from "@/lib/types/props";
import { Wrapper } from "../Wrapper/base";

export default function GameDeveloper({
  children,
  className,
  ...props
}: ParagraphElementProps) {
  return (
    <Wrapper
      as="p"
      className="text-[0.9rem] text-white/70"
      nextClass={className}
      {...props}
    >
      {children}
    </Wrapper>
  );
}
