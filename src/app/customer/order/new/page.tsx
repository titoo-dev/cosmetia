"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Search, List, Package, User, Send } from "lucide-react";
import { createOrderAction } from "../../../../actions/customer/order/new/create-order-action";
import { toast } from "sonner";

interface OrderFormData {
  finalResultFamily: string;
  finalResultName: string;
  finalResultQuantity: number;
  targetMarket: string;
  marketingAngle: string;
  formula: string;
  packagingType: string;
  estimatedTotalCost: number;
  providerId: string;
  orderItems: Array<{
    productId: string;
    quantity: number;
  }>;
}

const productFamilies = [
  "Alimentation et nutrition animale",
  "Produit agrochimiques", 
  "Chimie de base et intermédiaires",
  "CAS",
  "Ingrédient de nettoyage",
  "Matériaux composites",
  "Ingrédients cosmétiques",
  "Elastomères",
  "Fluide et lubrifiant",
  "Ingrédients alimentaires",
  "Pharmaceutique et nutraceutique",
  "Pigments et colorants",
  "Plastiques",
  "Produits prêt à l'emploi",
  "Autres"
];

const targetMarkets = [
  "Cosmétique",
  "Pharmaceutique", 
  "Alimentaire",
  "Industriel",
  "Agriculture",
  "Automobile",
  "Textile",
  "Autres"
];

const marketingAngles = [
  "Innovation",
  "Qualité",
  "Prix compétitif",
  "Durabilité",
  "Performance",
  "Sécurité",
  "Traçabilité",
  "Autres"
];

const steps = [
  { id: 1, name: "Angle marketing", icon: Search },
  { id: 2, name: "Formulation", icon: List },
  { id: 3, name: "Matière première", icon: Package },
  { id: 4, name: "Emballage", icon: Package },
  { id: 5, name: "Prestataires", icon: User },
  { id: 6, name: "Commande", icon: Send },
];

export default function OrderCreationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OrderFormData>({
    finalResultFamily: "",
    finalResultName: "",
    finalResultQuantity: 0,
    targetMarket: "",
    marketingAngle: "",
    formula: "",
    packagingType: "",
    estimatedTotalCost: 0,
    providerId: "",
    orderItems: []
  });

  const handleInputChange = (field: keyof OrderFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProductFamilySelect = (family: string) => {
    setFormData(prev => ({
      ...prev,
      finalResultFamily: family
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const result = await createOrderAction(formData);
      
      if (result.success) {
        toast.success("Commande créée avec succès!");
        // TODO: Redirect to orders page or show success message
        console.log("Order created:", result.order);
      } else {
        toast.error(result.error || "Erreur lors de la création de la commande");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Une erreur est survenue");
    }
  };

  const isStep1Valid = () => {
    return formData.finalResultFamily && 
           formData.finalResultName && 
           formData.finalResultQuantity > 0 && 
           formData.targetMarket && 
           formData.marketingAngle;
  };

  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Stepper Header */}
        <div className="mb-8 max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  currentStep === step.id 
                    ? 'bg-teal-700 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  <step.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="mx-2 text-gray-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Card className="p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Sélectionnez la famille du produit
              </h2>
              
              {/* Product Family Selection */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {productFamilies.map((family) => (
                  <button
                    key={family}
                    onClick={() => handleProductFamilySelect(family)}
                    className={`p-3 text-sm rounded-lg border transition-colors ${
                      formData.finalResultFamily === family
                        ? 'bg-teal-100 border-teal-300 text-teal-800'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
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
                    onChange={(e) => handleInputChange('finalResultName', e.target.value)}
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
                    onChange={(e) => handleInputChange('finalResultQuantity', parseInt(e.target.value) || 0)}
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
                  <Select value={formData.targetMarket} onValueChange={(value) => handleInputChange('targetMarket', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Sélectionnez le marché cible" />
                    </SelectTrigger>
                    <SelectContent>
                      {targetMarkets.map((market) => (
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
                  <Select value={formData.marketingAngle} onValueChange={(value) => handleInputChange('marketingAngle', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Sélectionnez l'angle marketing" />
                    </SelectTrigger>
                    <SelectContent>
                      {marketingAngles.map((angle) => (
                        <SelectItem key={angle} value={angle}>
                          {angle}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={handleNext}
                  disabled={!isStep1Valid()}
                  className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}

          {/* Placeholder for other steps */}
          {currentStep > 1 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Étape {currentStep} - {steps[currentStep - 1].name}
              </h3>
              <p className="text-gray-500 mb-6">
                Cette étape sera implémentée prochainement.
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Précédent
                </Button>
                {currentStep < steps.length ? (
                  <Button onClick={handleNext}>
                    Suivant
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="bg-teal-700 hover:bg-teal-800">
                    Créer la commande
                  </Button>
                )}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
