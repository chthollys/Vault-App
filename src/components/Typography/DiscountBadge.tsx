import type { SpanElementProps } from "@/lib/types/props";
import { Wrapper } from "@/components/Wrapper/base";

export default function DiscountBadge({
  className,
  children,
  ...props
}: SpanElementProps) {
  return (
    <Wrapper
      as="span"
      className="rounded-sm px-2 py-1 text-[0.8rem] font-semibold shadow-sm"
      nextClass={className}
      {...props}
    >
      {children}
    </Wrapper>
  );
}
