import type { SpanElementProps } from "@/lib/types/props";
import { Wrapper } from "../Wrapper/base";

export default function Logo({
  className,
  children,
  ...props
}: SpanElementProps) {
  return (
    <Wrapper
      as="span"
      className="bg-logo bg-clip-text text-[1.4rem] font-extrabold text-transparent"
      nextClass={className}
      {...props}
    >
      {children}
    </Wrapper>
  );
}
