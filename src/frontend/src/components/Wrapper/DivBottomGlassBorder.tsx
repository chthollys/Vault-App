import type { ChildrenProp } from "@/lib/types/props";

export default function DivBottomGlassBorder({ children }: ChildrenProp) {
  return (
    <div className="mb-8 flex flex-col border-b-[1px] border-solid border-b-white/10 pb-6 text-left">
      {children}
    </div>
  );
}
