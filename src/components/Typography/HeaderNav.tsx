import type { ChildrenProp } from "@/lib/types/props";

export default function HeaderNav({ children }: ChildrenProp) {
  return (
    <span className="text-[0.95rem] font-medium text-white/90">
      {children}
    </span>
  );
}
