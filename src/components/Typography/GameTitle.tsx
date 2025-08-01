import { ParagraphElementProps } from "@/lib/definitions";

export default function GameTitle({
  children,
  ...props
}: ParagraphElementProps) {
  return (
    <p
      className="mb-3 line-clamp-2 max-h-[2.6em] min-h-[2.6em] text-[1.1rem] leading-[1.3] font-semibold overflow-ellipsis text-white/90"
      {...props}
    >
      {children}
    </p>
  );
}
