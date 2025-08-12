import SortBySelect from "./Selections";
import Title from "./Title";

export default function TitleSection() {
  return (
    <div className="flex w-full justify-between">
      <Title />
      <SortBySelect />
    </div>
  );
}
