import { DivElementProps } from "@/lib/definitions";
import DivWrapper from "./base/Div";

export default function GameCoverWrapper({
  children,
  className,
  ...props
}: DivElementProps) {
  const baseClass = "relative h-[200px] overflow-hidden";
  return (
    <DivWrapper className={baseClass} nextClass={className} {...props}>
      {children}
    </DivWrapper>
  );
}
