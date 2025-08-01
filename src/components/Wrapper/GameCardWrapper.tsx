import { DivElementProps } from "@/lib/definitions";
import DivWrapper from "./base/Div";

export default function GameCardWrapper({
  children,
  className,
  ...props
}: DivElementProps) {
  const baseClass =
    "bg-glass border-glass shadow-glass relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border-[1px] border-solid p-0 backdrop-blur-2xl transition-(--transition-normal) hover:-translate-y-2 hover:bg-glass-hover hover:shadow-[0_20px_60px_rgba(0,_0,_0,_0.4)] hover:border-black/15";
  return (
    <DivWrapper className={baseClass} nextClass={className} {...props}>
      {children}
    </DivWrapper>
  );
}
