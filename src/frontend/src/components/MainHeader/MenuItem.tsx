import type { ChildrenProp } from "@/lib/types/props";

export default function MenuItem({ children }: ChildrenProp) {
  return (
    <li className="hover:bg-glass-hover cursor-pointer rounded-md px-4 py-3 text-white transition-(--transition-fast)">
      {children}
    </li>
  );
}
