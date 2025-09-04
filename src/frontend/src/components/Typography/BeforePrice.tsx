import type { SpanElementProps } from "@/lib/types/props";
import { Wrapper } from "@/components/Wrapper/base";

export default function BeforePrice({
  className,
  children,
  ...props
}: SpanElementProps) {
  return (
    <Wrapper
      as="span"
      className="text-[0.9rem] text-white/50 line-through"
      nextClass={className}
      {...props}
    >
      {children}
    </Wrapper>
  );
}
