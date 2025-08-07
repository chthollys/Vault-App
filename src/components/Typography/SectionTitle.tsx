import type { WrapperProps } from "@/lib/types/props";
import Wrapper from "../Wrapper/base/Wrapper";

export default function SectionTitle({
  className,
  children,
  ...props
}: WrapperProps<"h1">) {
  return (
    <Wrapper
      as="h1"
      className="m-0 text-[1.8rem] font-bold text-(--text-primary)"
      nextClass={className}
      {...props}
    >
      {children}
    </Wrapper>
  );
}
