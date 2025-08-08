import { Wrapper } from "@/components/Wrapper/base";
import type { ButtonElementProps } from "@/lib/types/props";

export default function PurpleButton({
  className,
  children,
  ...props
}: ButtonElementProps) {
  return (
    <Wrapper
      as="button"
      nextClass={className}
      className="bg-primary hover:bg-primary-dark cursor-pointer rounded-md border-none px-6 py-4 text-[0.9rem] font-semibold text-white transition-(--transition-fast) hover:-translate-y-[1px]"
      {...props}
    >
      {children}
    </Wrapper>
  );
}
