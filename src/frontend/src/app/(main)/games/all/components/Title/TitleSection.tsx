import { BreadcrumbsNav } from "@/UI/breadcrumb";
import SortBySelect from "./Selections";

export default function TitleSection() {
  return (
    <div className="mb-5 flex w-full items-center justify-between gap-5">
      <BreadcrumbsNav currentLabel="All" />
      <SortBySelect />
    </div>
  );
}
