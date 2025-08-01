import { ParagraphElementProps } from "@/lib/definitions";

export default function GameDeveloper({
  children,
  ...props
}: ParagraphElementProps) {
  return (
    <p className="mb-3 text-[0.9rem] text-white/70" {...props}>
      {children}
    </p>
  );
}
