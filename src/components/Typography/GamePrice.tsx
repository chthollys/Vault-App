import { SpanElementProps } from "@/lib/types/props";
import Wrapper from "../Wrapper/base/Wrapper";

export default function GamePrice({
  className,
  children,
  ...props
}: SpanElementProps) {
  const baseClasses = "text-accent-light text-[1.1rem] font-semibold";
  return (
    <Wrapper as="span" className={baseClasses} nextClass={className} {...props}>
      {children}
    </Wrapper>
  );
}
