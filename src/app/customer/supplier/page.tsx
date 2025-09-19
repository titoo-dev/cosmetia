"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MessageCircle, CheckCircle, MapPin, Package, FileText } from "lucide-react";

interface Supplier {
  id: string;
  companyName: string;
  siretNumber: string;
  nameOfContact: string;
  phoneNumber: string;
  website: string;
  activityDescription: string;
  pictureId?: string;
  currentPlan: "FREE" | "PAY_AS_YOU_GO" | "GROWTH";
  location: string;
  productCount: number;
  documentCount: number;
  salesCount?: number;
  certificationStatus: "Certifié" | "VerifyPlus" | "En attente";
  description: string;
  logo: string;
  logoColor: string;
}

const dummySuppliers: Supplier[] = [
  {
    id: "1",
    companyName: "HerbalHaven",
    siretNumber: "12345678901234",
    nameOfContact: "Marie Dubois",
    phoneNumber: "+33 1 23 45 67 89",
    website: "www.herbalhaven.fr",
    activityDescription: "Fournisseur d'ingrédients cosmétiques naturels",
    currentPlan: "GROWTH",
    location: "QG: France",
    productCount: 150,
    documentCount: 20,
    certificationStatus: "Certifié",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    logo: "M",
    logoColor: "bg-blue-500"
  },
  {
    id: "2",
    companyName: "NatureBlend",
    siretNumber: "23456789012345",
    nameOfContact: "Pierre Martin",
    phoneNumber: "+33 1 34 56 78 90",
    website: "www.natureblend.fr",
    activityDescription: "Spécialiste en ingrédients naturels",
    currentPlan: "PAY_AS_YOU_GO",
    location: "QG: France",
    productCount: 130,
    documentCount: 18,
    certificationStatus: "Certifié",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    logo: "8",
    logoColor: "bg-blue-500"
  },
  {
    id: "3",
    companyName: "GreenLeaf",
    siretNumber: "34567890123456",
    nameOfContact: "Sophie Laurent",
    phoneNumber: "+33 1 45 67 89 01",
    website: "www.greenleaf.fr",
    activityDescription: "Entreprise cosmétique innovante",
    currentPlan: "GROWTH",
    location: "QG: France",
    productCount: 110,
    documentCount: 10,
    certificationStatus: "VerifyPlus",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    logo: "LOVESCLIP",
    logoColor: "bg-red-500"
  },
  {
    id: "4",
    companyName: "EcoEssence",
    siretNumber: "45678901234567",
    nameOfContact: "Jean Dupont",
    phoneNumber: "+33 1 56 78 90 12",
    website: "www.ecoessence.fr",
    activityDescription: "Matériaux premiers cosmétiques durables",
    currentPlan: "FREE",
    location: "QG: France",
    productCount: 140,
    documentCount: 22,
    salesCount: 22,
    certificationStatus: "En attente",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    logo: "sushi",
    logoColor: "bg-white text-black border border-gray-300"
  },
  {
    id: "5",
    companyName: "PureHarvest",
    siretNumber: "56789012345678",
    nameOfContact: "Claire Moreau",
    phoneNumber: "+33 1 67 89 01 23",
    website: "www.pureharvest.fr",
    activityDescription: "Récolte pure et ingrédients bio",
    currentPlan: "GROWTH",
    location: "QG: France",
    productCount: 160,
    documentCount: 25,
    certificationStatus: "Certifié",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    logo: "∞",
    logoColor: "bg-blue-500"
  },
  {
    id: "6",
    companyName: "PureHarvest",
    siretNumber: "67890123456789",
    nameOfContact: "Thomas Bernard",
    phoneNumber: "+33 1 78 90 12 34",
    website: "www.pureharvest-2.fr",
    activityDescription: "Fournisseur cosmétique premium",
    currentPlan: "GROWTH",
    location: "QG: France",
    productCount: 160,
    documentCount: 25,
    certificationStatus: "Certifié",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    logo: "∞",
    logoColor: "bg-red-500"
  },
  {
    id: "7",
    companyName: "PureHarvest",
    siretNumber: "78901234567890",
    nameOfContact: "Isabelle Rousseau",
    phoneNumber: "+33 1 89 01 23 45",
    website: "www.pureharvest-3.fr",
    activityDescription: "Matériaux premiers cosmétiques",
    currentPlan: "GROWTH",
    location: "QG: France",
    productCount: 160,
    documentCount: 25,
    certificationStatus: "Certifié",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    logo: "AD",
    logoColor: "bg-red-500"
  },
  {
    id: "8",
    companyName: "PureHarvest",
    siretNumber: "89012345678901",
    nameOfContact: "Michel Leroy",
    phoneNumber: "+33 1 90 12 34 56",
    website: "www.pureharvest-4.fr",
    activityDescription: "Fournisseur de matières premières cosmétiques",
    currentPlan: "GROWTH",
    location: "QG: France",
    productCount: 160,
    documentCount: 25,
    certificationStatus: "Certifié",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    logo: "NHÀ THUỐC LONG CHÂU",
    logoColor: "bg-white text-black border border-gray-300"
  }
];

export default function SupplierPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const getCertificationIcon = (status: string) => {
    if (status === "Certifié" || status === "VerifyPlus") {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    return null;
  };

  const getCertificationColor = (status: string) => {
    switch (status) {
      case "Certifié":
        return "text-green-600";
      case "VerifyPlus":
        return "text-green-600";
      case "En attente":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header and Search Bar */}
        <div className="mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Recherche d'un fournisseur"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md pl-12 pr-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-md">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="natural">Ingrédients naturels</SelectItem>
                <SelectItem value="organic">Bio et écologique</SelectItem>
                <SelectItem value="premium">Premium et luxe</SelectItem>
                <SelectItem value="raw-materials">Matières premières</SelectItem>
                <SelectItem value="active-ingredients">Ingrédients actifs</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Région" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="france">France</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="asia">Asie</SelectItem>
                <SelectItem value="americas">Amériques</SelectItem>
                <SelectItem value="africa">Afrique</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Supplier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dummySuppliers.map((supplier) => (
            <Card key={supplier.id} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 p-0">
              <CardContent className="p-0">
                {/* Supplier Image Placeholder */}
                <div className="w-full h-48 bg-gray-200 rounded-tl-lg rounded-tr-lg mb-4 flex items-center justify-center relative">
                  <div className="text-gray-400 text-sm">Supplier Image</div>
                </div>

                {/* Company Logo */}
                <div className="relative -mt-8 ml-4 mb-4">
                  <div className={`w-12 h-12 ${supplier.logoColor} rounded-full flex items-center justify-center shadow-lg`}>
                    <span className="text-white text-xs font-bold text-center">
                      {supplier.logo.length > 3 ? supplier.logo.substring(0, 3) : supplier.logo}
                    </span>
                  </div>
                </div>

                {/* Company Info */}
                <div className="px-4 pb-4">
                  {/* Company Name */}
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {supplier.companyName}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center space-x-1 mb-3">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{supplier.location}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <Package className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {supplier.productCount} produits
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {supplier.documentCount} documents
                      </span>
                    </div>
                  </div>

                  {/* Sales count if available */}
                  {supplier.salesCount && (
                    <div className="flex items-center space-x-1 mb-3">
                      <span className="text-sm text-gray-600">
                        {supplier.salesCount} ventes
                      </span>
                    </div>
                  )}

                  {/* Certification Status */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      {getCertificationIcon(supplier.certificationStatus)}
                      <span className={`text-sm font-medium ${getCertificationColor(supplier.certificationStatus)}`}>
                        {supplier.certificationStatus}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {supplier.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chat Button */}
        <div className="fixed bottom-6 right-6">
          <Button className="bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-full shadow-lg">
            <MessageCircle className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
