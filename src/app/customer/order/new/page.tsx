"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { createOrderAction } from "../../../../actions/customer/order/new/create-order-action";
import { toast } from "sonner";
import { OrderStepper } from "@/components/customer/order/order-stepper";
import { StepMarketingAngle } from "@/components/customer/order/step-marketing-angle";
import { StepPackaging } from "@/components/customer/order/step-packaging";
import { StepPlaceholder } from "@/components/customer/order/step-placeholder";
import { OrderFormData } from "@/components/customer/order/order-types";
import { STEPS } from "@/components/customer/order/order-constants";

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

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const result = await createOrderAction(formData);

      if (result.success) {
        toast.success("Commande créée avec succès!");
        console.log("Order created:", result.order);
      } else {
        toast.error(result.error || "Erreur lors de la création de la commande");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Une erreur est survenue");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepMarketingAngle
            formData={formData}
            onFieldChange={handleInputChange}
            onNext={handleNext}
          />
        );
      case 4:
        return (
          <StepPackaging
            selectedPackaging={formData.packagingType}
            onPackagingSelect={(packagingId) => handleInputChange("packagingType", packagingId)}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        );
      default:
        return (
          <StepPlaceholder
            currentStep={currentStep}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
            totalSteps={STEPS.length}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="max-w-7xl mx-auto">
        <OrderStepper currentStep={currentStep} />
        <Card className="p-8">{renderStep()}</Card>
      </div>
    </div>
  );
}
