"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { createSupplierProductAction } from "@/actions/supplier/products/create-supplier-product-action";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Package,
  FileText,
  DollarSign,
  Award,
  Image as ImageIcon,
  Upload,
  X,
  CheckCircle
} from "lucide-react";
import Image from "next/image";
import {
  ProductCategoryEntity,
  ProductFunctionEntity,
  ProductCountryEntity
} from "@/lib/types/types";
import { Badge } from "@/components/ui/badge";

interface NewProductClientProps {
  categories: ProductCategoryEntity[];
  functions: ProductFunctionEntity[];
  countries: ProductCountryEntity[];
}

type Step = 1 | 2 | 3 | 4;

export default function NewProductClient({
  categories,
  functions,
  countries,
}: NewProductClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    tradeName: "",
    description: "",
    inciName: "",
    certificate: "",
    pricePerQuantity: "",
    deliveryTime: "",
    minimumOrderQuantity: "",
    categoriesToAdd: [] as string[],
    functionsToAdd: [] as string[],
    countriesToAdd: [] as string[],
    picture: null as File | null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string | string[] | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSelection = (field: "categoriesToAdd" | "functionsToAdd" | "countriesToAdd", id: string) => {
    setFormData((prev) => {
      const currentIds = prev[field];
      const newIds = currentIds.includes(id)
        ? currentIds.filter((i) => i !== id)
        : [...currentIds, id];
      return { ...prev, [field]: newIds };
    });
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    handleInputChange("picture", file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemoveImage = () => {
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    handleInputChange("picture", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return formData.tradeName && formData.description && formData.inciName;
      case 2:
        return formData.pricePerQuantity && formData.deliveryTime && formData.minimumOrderQuantity;
      case 3:
        return formData.certificate && formData.categoriesToAdd.length > 0;
      case 4:
        return true; // Image is optional
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 4 && canProceedToNextStep()) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canProceedToNextStep()) {
      toast.error("Veuillez remplir tous les champs requis");
      return;
    }

    startTransition(async () => {
      try {
        const formDataToSend = new FormData();

        formDataToSend.append("tradeName", formData.tradeName);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("inciName", formData.inciName);
        formDataToSend.append("certificate", formData.certificate);
        formDataToSend.append("pricePerQuantity", formData.pricePerQuantity);
        formDataToSend.append("deliveryTime", formData.deliveryTime);
        formDataToSend.append("minimumOrderQuantity", formData.minimumOrderQuantity);

        // Append arrays - each item separately
        formData.categoriesToAdd.forEach((id) => {
          formDataToSend.append("categoriesToAdd", id);
        });

        formData.functionsToAdd.forEach((id) => {
          formDataToSend.append("functionsToAdd", id);
        });

        formData.countriesToAdd.forEach((id) => {
          formDataToSend.append("countriesToAdd", id);
        });

        if (formData.picture) {
          formDataToSend.append("picture", formData.picture);
        }

        const result = await createSupplierProductAction(formDataToSend);

        if (result.success) {
          toast.success(result.message || "Produit créé avec succès");
          router.push("/supplier/products");
        } else {
          toast.error(result.message || "Erreur lors de la création du produit");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Une erreur est survenue");
      }
    });
  };

  const steps = [
    { number: 1, title: "Informations de base", icon: Package },
    { number: 2, title: "Tarifs & Logistique", icon: DollarSign },
    { number: 3, title: "Certifications & Catégories", icon: Award },
    { number: 4, title: "Image du produit", icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => router.push("/supplier/products")}
              className="mb-4 text-gray-600 hover:text-[#166970]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux produits
            </Button>
            <h1 className="text-3xl font-bold text-[#000000]">Créer un nouveau produit</h1>
            <p className="text-gray-600 mt-2">Ajoutez un nouveau produit à votre catalogue</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;

                return (
                  <div key={step.number} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                          isActive
                            ? "bg-[#166970] border-[#166970] text-white"
                            : isCompleted
                            ? "bg-green-500 border-green-500 text-white"
                            : "bg-white border-gray-300 text-gray-400"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <Icon className="w-6 h-6" />
                        )}
                      </div>
                      <span
                        className={`text-xs mt-2 text-center hidden md:block ${
                          isActive ? "text-[#166970] font-semibold" : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 mx-2 ${
                          currentStep > step.number ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Card className="border-gray-200 shadow-sm">
              <CardContent className="p-6">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="tradeName" className="text-sm font-medium text-[#000000]">
                        Nom commercial <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="tradeName"
                        value={formData.tradeName}
                        onChange={(e) => handleInputChange("tradeName", e.target.value)}
                        placeholder="Ex: Huile d'Argan Bio"
                        className="mt-1.5"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-sm font-medium text-[#000000]">
                        Description <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Décrivez les caractéristiques et avantages de votre produit..."
                        className="mt-1.5 min-h-[120px]"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="inciName" className="text-sm font-medium text-[#000000]">
                        Nom INCI <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="inciName"
                        value={formData.inciName}
                        onChange={(e) => handleInputChange("inciName", e.target.value)}
                        placeholder="Ex: Argania Spinosa Kernel Oil"
                        className="mt-1.5"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Nomenclature internationale des ingrédients cosmétiques
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 2: Pricing & Logistics */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="pricePerQuantity" className="text-sm font-medium text-[#000000]">
                        Prix par quantité <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="pricePerQuantity"
                        value={formData.pricePerQuantity}
                        onChange={(e) => handleInputChange("pricePerQuantity", e.target.value)}
                        placeholder="Ex: 15€/kg"
                        className="mt-1.5"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="deliveryTime" className="text-sm font-medium text-[#000000]">
                        Délai de livraison <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="deliveryTime"
                        value={formData.deliveryTime}
                        onChange={(e) => handleInputChange("deliveryTime", e.target.value)}
                        placeholder="Ex: 2-3 semaines"
                        className="mt-1.5"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="minimumOrderQuantity" className="text-sm font-medium text-[#000000]">
                        Quantité minimum de commande (kg) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="minimumOrderQuantity"
                        type="number"
                        min="1"
                        value={formData.minimumOrderQuantity}
                        onChange={(e) => handleInputChange("minimumOrderQuantity", e.target.value)}
                        placeholder="Ex: 10"
                        className="mt-1.5"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Certifications & Categories */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="certificate" className="text-sm font-medium text-[#000000]">
                        Certificat <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="certificate"
                        value={formData.certificate}
                        onChange={(e) => handleInputChange("certificate", e.target.value)}
                        placeholder="Ex: Bio, Ecocert, Cosmos..."
                        className="mt-1.5"
                        required
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-[#000000]">
                        Catégories <span className="text-red-500">*</span>
                      </Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <Badge
                            key={category.id}
                            variant={formData.categoriesToAdd.includes(category.id) ? "default" : "outline"}
                            className={`cursor-pointer ${
                              formData.categoriesToAdd.includes(category.id)
                                ? "bg-[#166970] text-white hover:bg-[#145a61]"
                                : "hover:border-[#166970] hover:text-[#166970]"
                            }`}
                            onClick={() => toggleSelection("categoriesToAdd", category.id)}
                          >
                            {category.name}
                          </Badge>
                        ))}
                      </div>
                      {formData.categoriesToAdd.length === 0 && (
                        <p className="text-xs text-red-500 mt-1">Sélectionnez au moins une catégorie</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-[#000000]">Fonctions</Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {functions.map((func) => (
                          <Badge
                            key={func.id}
                            variant={formData.functionsToAdd.includes(func.id) ? "default" : "outline"}
                            className={`cursor-pointer ${
                              formData.functionsToAdd.includes(func.id)
                                ? "bg-[#166970] text-white hover:bg-[#145a61]"
                                : "hover:border-[#166970] hover:text-[#166970]"
                            }`}
                            onClick={() => toggleSelection("functionsToAdd", func.id)}
                          >
                            {func.name}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-[#000000]">Pays d'export</Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {countries.map((country) => (
                          <Badge
                            key={country.id}
                            variant={formData.countriesToAdd.includes(country.id) ? "default" : "outline"}
                            className={`cursor-pointer ${
                              formData.countriesToAdd.includes(country.id)
                                ? "bg-[#166970] text-white hover:bg-[#145a61]"
                                : "hover:border-[#166970] hover:text-[#166970]"
                            }`}
                            onClick={() => toggleSelection("countriesToAdd", country.id)}
                          >
                            {country.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Image Upload */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    {!previewUrl ? (
                      <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
                          dragActive
                            ? "border-[#166970] bg-[#F7F4EF]"
                            : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="flex flex-col items-center space-y-4">
                          <div className="w-16 h-16 bg-[#F7F4EF] rounded-lg flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-[#166970]" />
                          </div>
                          <div className="space-y-2">
                            <Button
                              type="button"
                              variant="outline"
                              className="flex items-center gap-2 border-[#166970] text-[#166970] hover:bg-[#166970] hover:text-white"
                              onClick={(e) => {
                                e.stopPropagation();
                                fileInputRef.current?.click();
                              }}
                            >
                              <Upload className="w-4 h-4" />
                              Sélectionner une image
                            </Button>
                            <p className="text-sm text-gray-500">
                              ou glissez-déposez une image ici
                            </p>
                            <p className="text-xs text-gray-400">
                              PNG, JPG, WEBP jusqu'à 10MB
                            </p>
                          </div>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="relative rounded-lg border overflow-hidden">
                          <Image
                            src={previewUrl}
                            alt="Preview"
                            width={600}
                            height={300}
                            className="w-full h-64 object-cover"
                            unoptimized
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={handleRemoveImage}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="mt-6 flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1 || isPending}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Précédent
              </Button>

              <div className="flex items-center gap-3">
                {currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!canProceedToNextStep() || isPending}
                    className="bg-[#166970] hover:bg-[#145a61] text-white"
                  >
                    Suivant
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-[#166970] hover:bg-[#145a61] text-white"
                  >
                    {isPending ? "Création en cours..." : "Créer le produit"}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
