import type { ChildrenProp } from "@/lib/types/props";

export default function ImageCarouselItemOverlay({ children }: ChildrenProp) {
  return (
    <div className="absolute right-0 bottom-0 left-0 z-2 flex h-[60%] w-full items-end bg-[linear-gradient(to_top,_rgba(0,_0,_0,_0.9)_0%,_rgba(0,_0,_0,_0.65)_30%,_rgba(0,_0,_0,_0.25)_75%,_transparent_100%)] p-8 transition-(--transition-normal)">
      {children}
    </div>
  );
}
