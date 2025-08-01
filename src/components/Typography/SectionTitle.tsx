import { ChildrenProp } from "@/lib/definitions";

export default function SectionTitle({ children }: ChildrenProp) {
  return (
    <h1 className="m-0 text-[1.8rem] font-bold text-(--text-primary)">
      {children}
    </h1>
  );
}
