import type { SpanElementProps } from "@/lib/types/props";

export default function FeaturedTitleSpan({
  children,
  ...props
}: SpanElementProps) {
  return (
    <span
      className="text-2xl font-bold text-white text-shadow-[0_2px_8px_rgba(0,_0,_0,_0.6)]"
      {...props}
    >
      {children}
    </span>
  );
}
