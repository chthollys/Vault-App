import type { FooterLinkSectionProps } from "@/lib/types/props";

export default function FooterLinkSection({
  label,
  children,
  ...props
}: FooterLinkSectionProps) {
  return (
    <div className="flex flex-col gap-4" {...props}>
      {label && (
        <h4 className="text-base font-semibold tracking-wider text-white/90 uppercase">
          {label}
        </h4>
      )}
      <ul className="m-0 list-none p-0 space-y-3">{children}</ul>
    </div>
  );
}
