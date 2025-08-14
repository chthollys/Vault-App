import type { AsideCheckboxProps } from "@/lib/types/props";

export default function AsideBarCheckbox({
  name,
  id = name,
  label,
  checked = false,
  disabled = false,
  onChange,
}: AsideCheckboxProps) {
  return (
    <label htmlFor={id}>
      <li className="group mb-4 flex items-center gap-2 hover:cursor-pointer">
        <input
          id={id}
          name={name}
          type="checkbox"
          onChange={onChange}
          className="accent-primary h-4 w-4"
          checked={checked}
          disabled={disabled}
        />
        <span className="group-hover:text-primary text-[0.9rem]">{label}</span>
      </li>
    </label>
  );
}
