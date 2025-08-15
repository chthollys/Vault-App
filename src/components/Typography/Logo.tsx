import type { ChildrenProp } from "@/lib/types/props";

export default function Logo({ children }: ChildrenProp) {
  return (
    <span className="bg-logo bg-clip-text text-[1.4rem] font-extrabold text-transparent">
      {children}
    </span>
  );
}
