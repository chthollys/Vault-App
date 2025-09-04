import SortBySelect from "./Selections";
import Title from "./Title";

export default function TitleSection() {
  return (
    <div className="mb-5 flex w-full items-center justify-between gap-5">
      <Title />
      <SortBySelect />
    </div>
  );
}
