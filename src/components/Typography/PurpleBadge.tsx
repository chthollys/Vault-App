import { ParagraphElementProps } from "@/lib/types/props";

export default function PurpleBadge({ children }: ParagraphElementProps) {
  return (
    <p className="bg-primary mb-4 inline-block rounded-full px-4 py-2 text-[0.8rem] font-semibold tracking-[0.5px] text-white uppercase shadow-[0_2px_8px_rgba(139,_92,_246,_0.3)]">
      {children}
    </p>
  );
}
