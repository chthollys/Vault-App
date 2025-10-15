import { FormTitle } from "@/components/Typography";
import { BreadcrumbsNav } from "@/UI/breadcrumb";

export default function TitleSection() {
  return (
    <section
      role="cart-title-section"
      className="col-span-2 flex flex-col gap-3"
    >
      <BreadcrumbsNav />
      <FormTitle>My Cart</FormTitle>
    </section>
  );
}
