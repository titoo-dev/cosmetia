import { PackagingOption } from "./order-constants";

interface PackagingOptionCardProps {
  option: PackagingOption;
  isSelected: boolean;
  onSelect: () => void;
}

export function PackagingOptionCard({
  option,
  isSelected,
  onSelect
}: PackagingOptionCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`${option.bgColor} ${option.hoverColor} rounded-3xl p-8 flex flex-col items-center justify-center gap-6 transition-all ${
        isSelected ? "ring-4 ring-teal-700 ring-offset-2" : ""
      }`}
    >
      <option.icon className="w-16 h-16 stroke-[1.5]" strokeWidth={1.5} />
      <span className="text-xl font-semibold text-gray-900">
        {option.name}
      </span>
    </button>
  );
}
