import { Button } from "@/components/ui/button";

interface StepNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoNext: boolean;
  showPrevious?: boolean;
  nextLabel?: string;
}

export function StepNavigation({
  onPrevious,
  onNext,
  canGoNext,
  showPrevious = true,
  nextLabel = "Suivant"
}: StepNavigationProps) {
  return (
    <div className="flex justify-between pt-4">
      {showPrevious ? (
        <Button
          variant="outline"
          onClick={onPrevious}
          className="px-8 py-2 rounded-lg"
        >
          Précédent
        </Button>
      ) : (
        <div />
      )}
      <Button
        onClick={onNext}
        disabled={!canGoNext}
        className="bg-teal-700 hover:bg-teal-800 text-white px-8 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {nextLabel}
      </Button>
    </div>
  );
}
