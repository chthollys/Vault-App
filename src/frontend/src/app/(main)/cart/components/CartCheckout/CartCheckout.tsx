import {
  GameCardWrapper as CardWrapper,
  DivBottomGlassBorder,
} from "@/components/Wrapper";
import { SectionTitle } from "@/components/Typography";

export default function CartCheckout() {
  return (
    <CardWrapper className="flex w-full max-w-[30rem] flex-col px-6 py-4">
      <SectionTitle>Checkout</SectionTitle>
      <DivBottomGlassBorder className="mb-0 pb-2"></DivBottomGlassBorder>
      <ul></ul>
    </CardWrapper>
  );
}
