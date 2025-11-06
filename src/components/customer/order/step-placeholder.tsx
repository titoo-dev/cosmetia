import { Button } from "@/components/ui/button";
import { STEPS } from "./order-constants";

interface StepPlaceholderProps {
  currentStep: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  totalSteps: number;
}

export function StepPlaceholder({
  currentStep,
  onPrevious,
  onNext,
  onSubmit,
  totalSteps,
}: StepPlaceholderProps) {
  return (
    <div className="text-center py-12">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Étape {currentStep} - {STEPS[currentStep - 1].name}
      </h3>
      <p className="text-gray-500 mb-6">
        Cette étape sera implémentée prochainement.
      </p>
      <div className="flex gap-4 justify-center">
        <Button variant="outline" onClick={onPrevious}>
          Précédent
        </Button>
        {currentStep < totalSteps ? (
          <Button onClick={onNext}>Suivant</Button>
        ) : (
          <Button onClick={onSubmit} className="bg-teal-700 hover:bg-teal-800">
            Créer la commande
          </Button>
        )}
      </div>
    </div>
  );
}
