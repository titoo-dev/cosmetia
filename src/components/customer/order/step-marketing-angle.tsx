import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRODUCT_FAMILIES, TARGET_MARKETS, MARKETING_ANGLES } from "./order-constants";
import { StepNavigation } from "./step-navigation";
import { OrderFormData } from "./order-types";

interface StepMarketingAngleProps {
  formData: OrderFormData;
  onFieldChange: (field: keyof OrderFormData, value: string | number) => void;
  onNext: () => void;
}

export function StepMarketingAngle({
  formData,
  onFieldChange,
  onNext,
}: StepMarketingAngleProps) {
  const isValid = () => {
    return (
      formData.finalResultFamily &&
      formData.finalResultName &&
      formData.finalResultQuantity > 0 &&
      formData.targetMarket &&
      formData.marketingAngle
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Sélectionnez la famille du produit
      </h2>

      {/* Product Family Selection */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {PRODUCT_FAMILIES.map((family) => (
          <button
            key={family}
            onClick={() => onFieldChange("finalResultFamily", family)}
            className={`p-3 text-sm rounded-lg border transition-colors ${
              formData.finalResultFamily === family
                ? "bg-teal-100 border-teal-300 text-teal-800"
                : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {family}
          </button>
        ))}
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label htmlFor="productName" className="text-sm font-medium text-gray-700">
            Entrez le nom de produit
          </Label>
          <Input
            id="productName"
            value={formData.finalResultName}
            onChange={(e) => onFieldChange("finalResultName", e.target.value)}
            placeholder="Nom du produit"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="quantity" className="text-sm font-medium text-gray-700">
            Entrez la quantité souhaitée
          </Label>
          <Input
            id="quantity"
            type="number"
            value={formData.finalResultQuantity}
            onChange={(e) =>
              onFieldChange("finalResultQuantity", parseInt(e.target.value) || 0)
            }
            placeholder="Quantité"
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label htmlFor="targetMarket" className="text-sm font-medium text-gray-700">
            Quel est le marché cible?
          </Label>
          <Select
            value={formData.targetMarket}
            onValueChange={(value) => onFieldChange("targetMarket", value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Sélectionnez le marché cible" />
            </SelectTrigger>
            <SelectContent>
              {TARGET_MARKETS.map((market) => (
                <SelectItem key={market} value={market}>
                  {market}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="marketingAngle" className="text-sm font-medium text-gray-700">
            Quel est l'angle marketing?
          </Label>
          <Select
            value={formData.marketingAngle}
            onValueChange={(value) => onFieldChange("marketingAngle", value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Sélectionnez l'angle marketing" />
            </SelectTrigger>
            <SelectContent>
              {MARKETING_ANGLES.map((angle) => (
                <SelectItem key={angle} value={angle}>
                  {angle}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <StepNavigation
        onPrevious={() => {}}
        onNext={onNext}
        canGoNext={isValid()}
        showPrevious={false}
      />
    </div>
  );
}
