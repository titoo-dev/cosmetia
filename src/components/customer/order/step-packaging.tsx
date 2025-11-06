import { PACKAGING_OPTIONS } from "./order-constants";
import { PackagingOptionCard } from "./packaging-option-card";
import { StepNavigation } from "./step-navigation";

interface StepPackagingProps {
  selectedPackaging: string;
  onPackagingSelect: (packagingId: string) => void;
  onPrevious: () => void;
  onNext: () => void;
}

export function StepPackaging({
  selectedPackaging,
  onPackagingSelect,
  onPrevious,
  onNext
}: StepPackagingProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        Sélectionnez l'emballage
      </h2>

      <div className="grid grid-cols-3 gap-6 max-w-3xl">
        {PACKAGING_OPTIONS.map((option) => (
          <PackagingOptionCard
            key={option.id}
            option={option}
            isSelected={selectedPackaging === option.id}
            onSelect={() => onPackagingSelect(option.id)}
          />
        ))}
      </div>

      <StepNavigation
        onPrevious={onPrevious}
        onNext={onNext}
        canGoNext={!!selectedPackaging}
      />
    </div>
  );
}
