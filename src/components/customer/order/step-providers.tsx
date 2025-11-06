import { Button } from "@/components/ui/button";
import { MOCK_PROVIDERS } from "./order-constants";
import { ProviderCard } from "./provider-card";

interface StepProvidersProps {
  selectedProviderId: string;
  onProviderSelect: (providerId: string) => void;
  onPrevious: () => void;
  onSubmit: () => void;
}

export function StepProviders({
  selectedProviderId,
  onProviderSelect,
  onPrevious,
  onSubmit,
}: StepProvidersProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">
        Sélectionez la personne qui peut suivre la commande
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {MOCK_PROVIDERS.map((provider) => (
          <ProviderCard
            key={provider.id}
            provider={provider}
            isSelected={selectedProviderId === provider.id}
            onSelect={() => onProviderSelect(provider.id)}
          />
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={onPrevious}
          className="px-8 py-2 rounded-lg"
        >
          Précédent
        </Button>
        <Button
          onClick={onSubmit}
          disabled={!selectedProviderId}
          className="bg-teal-700 hover:bg-teal-800 text-white px-8 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Lancer la commande
        </Button>
      </div>
    </div>
  );
}
