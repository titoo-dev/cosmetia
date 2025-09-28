"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MessageCircle, Share, Star, MapPin, Check } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  supplier: string;
  certified: boolean;
}

interface Document {
  id: string;
  type: string;
  title: string;
  description: string;
  supplier: string;
  certified: boolean;
}

const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Huile de coco",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/api/placeholder/200/150",
    rating: 3,
    supplier: "HerbalHaven",
    certified: true
  },
  {
    id: "2",
    name: "Huile d'argan",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/api/placeholder/200/150",
    rating: 3,
    supplier: "HerbalHaven",
    certified: true
  },
  {
    id: "3",
    name: "Beurre de karité",
    description: "Anti-inflammatoire, Digestif",
    image: "/api/placeholder/200/150",
    rating: 4,
    supplier: "HerbalHaven",
    certified: true
  },
  {
    id: "4",
    name: "Acide hyaluronique",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/api/placeholder/200/150",
    rating: 3,
    supplier: "HerbalHaven",
    certified: true
  }
];

const dummyDocuments: Document[] = [
  {
    id: "1",
    type: "Fiche produit",
    title: "Masque hydratant Énergie de Vie - 98765wxyz France - Liste des ingréd...",
    description: "Ce masque frais et lumineux aide à revitaliser la peau tout en lui apportant hydratation et éclat.",
    supplier: "HerbalHaven",
    certified: true
  },
  {
    id: "2",
    type: "Fiche produit",
    title: "Huile Prodigieuse - 13579hjkl France - Liste des ingrédients",
    description: "Un soin multi-usages qui nourrit, adoucit et sublime le corps, le visage et les cheveux avec une formule légèr...",
    supplier: "HerbalHaven",
    certified: true
  },
  {
    id: "3",
    type: "Fiche produit",
    title: "Crème réparatrice Aquasource - 24680mnop France - Liste des ingré...",
    description: "Cette crème riche hydrate intensément et aide à rétablir l'équilibre de la peau, la rendant soup.",
    supplier: "HerbalHaven",
    certified: true
  },
  {
    id: "4",
    type: "Fiche technique",
    title: "Farine de riz HOMECRAFT® Create 835 - 34121D00 États-Unis - Liste de...",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    supplier: "HerbalHaven",
    certified: true
  }
];

export default function SupplierDetailPage() {
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);

  const toggleDocumentSelection = (documentId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(documentId) 
        ? prev.filter(id => id !== documentId)
        : [...prev, documentId]
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">HerbalHaven</h1>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>Message</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Share className="w-4 h-4" />
              <span>Partager</span>
            </Button>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="relative w-full h-64 bg-gray-200 rounded-lg mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800/80 to-transparent"></div>
          <div className="absolute left-6 top-6">
            <div className="bg-amber-800 text-white px-4 py-3 rounded-lg">
              <div className="text-sm font-bold uppercase leading-tight">
                COSMETIC<br />
                INGREDIENTS<br />
                SUPPLIER
              </div>
            </div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-green-500 rounded flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">À propos de nous</h2>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>QG: Paris - France</span>
          </div>
        </div>

        {/* Browse Products Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Parcourir les produits par marché</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dummyProducts.map((product) => (
              <Card key={product.id} className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Product Image</span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">{product.supplier}</span>
                      </div>
                      {product.certified && (
                        <Badge variant="secondary" className="text-xs">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                          Certifier
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center space-x-1">
                      {renderStars(product.rating)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Documents Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Lire les documents fournis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dummyDocuments.map((document) => (
              <Card key={document.id} className="bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">{document.type}</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 mb-3">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">{document.supplier}</span>
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 mb-2 line-clamp-2">{document.title}</h3>
                  <p className="text-xs text-gray-600 mb-4 line-clamp-3">{document.description}</p>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`document-${document.id}`}
                      checked={selectedDocuments.includes(document.id)}
                      onChange={() => toggleDocumentSelection(document.id)}
                      className="mr-2"
                    />
                    <label htmlFor={`document-${document.id}`} className="text-sm text-gray-600 cursor-pointer">
                      Comparer
                    </label>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
