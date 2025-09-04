import type { ChildrenProp } from "@/lib/types/props";

export default function GlassLine({ children }: ChildrenProp) {
  return (
    <div className="flex w-auto items-center justify-center">
      <div className="border-glass-border w-full border-[1px] border-solid"></div>
      {children}
      <div className="border-glass-border w-full border-[1px] border-solid"></div>
    </div>
  );
}
