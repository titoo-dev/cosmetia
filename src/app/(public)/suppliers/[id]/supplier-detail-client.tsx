"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Share, Star, MapPin, Check, CheckCircle } from "lucide-react";
import { SupplierDetailEntity } from "@/actions/get-supplier-detail-action";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SupplierDetailClientProps {
  supplier: SupplierDetailEntity;
}

export default function SupplierDetailClient({ supplier }: SupplierDetailClientProps) {
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
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{supplier.companyName}</h1>
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
        <div className="relative w-full h-64 rounded-lg mb-8 overflow-hidden">
          {supplier.coverPhotoUrl ? (
            <Image
              src={supplier.coverPhotoUrl}
              alt={supplier.companyName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-green-800 to-green-600"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800/60 to-transparent"></div>
          <div className="absolute left-6 top-6">
            {supplier.pictureUrl ? (
              <div className="relative">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-white p-1">
                  <Image
                    src={supplier.pictureUrl}
                    alt={supplier.companyName}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full rounded"
                  />
                </div>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>

        {/* About Us Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">À propos de nous</h2>
          <p className="text-gray-600 mb-4">
            {supplier.activityDescription}
          </p>
          {supplier.website && (
            <div className="flex items-center text-gray-600 mb-2">
              <span className="font-semibold mr-2">Site web:</span>
              <a
                href={supplier.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#166970] hover:underline"
              >
                {supplier.website}
              </a>
            </div>
          )}
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>QG: {supplier.nameOfContact || "France"}</span>
          </div>
        </div>

        {/* Browse Products Section */}
        {supplier.products && supplier.products.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Parcourir les produits par marché</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supplier.products.map((product) => (
                <Link href={`/marketplace/products/${product.id}`} key={product.id}>
                  <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer pt-0">
                    <CardContent className="p-0">
                      {/* Product Image */}
                      <div className="w-full h-48 bg-gray-200 rounded-t-lg mb-4 relative overflow-hidden">
                        {product.pictureUrl ? (
                          <Image
                            src={product.pictureUrl}
                            alt={product.tradeName || "Product Image"}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-gray-400 text-sm">Product Image</span>
                          </div>
                        )}
                      </div>

                      {/* Company Info */}
                      <div className="flex items-center justify-between mb-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage
                              src={product.owner?.picture}
                              alt={product.owner?.companyName || 'Company'}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-blue-500 text-white text-xs font-bold uppercase">
                              {product.owner?.companyName?.charAt(0) || supplier.companyName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-gray-700">
                            {product.owner?.companyName || supplier.companyName}
                          </span>
                        </div>
                        {product.certificate && (
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-green-600 font-medium">Certifier</span>
                          </div>
                        )}
                      </div>

                      {/* Product Name */}
                      <h3 className="font-bold text-lg text-gray-900 mb-2 px-4">
                        {product.tradeName}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2 px-4">
                        {product.description}
                      </p>

                      {/* Regulation Score */}
                      <div className="flex items-center space-x-1 mb-4 px-4">
                        {renderStars(product.regulationScore)}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Documents Section */}
        {supplier.documents && supplier.documents.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Lire les documents fournis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supplier.documents.map((document) => (
                <Card key={document.id} className="bg-white shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">{document.technicalSheet || "Fiche produit"}</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 mb-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">{document.owner?.companyName || supplier.companyName}</span>
                    </div>
                    <h3 className="font-bold text-sm text-gray-900 mb-2 line-clamp-2">{document.name}</h3>
                    <p className="text-xs text-gray-600 mb-4 line-clamp-3">{document.description}</p>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`document-${document.id}`}
                        checked={selectedDocuments.includes(document.id)}
                        onChange={() => toggleDocumentSelection(document.id)}
                        className="mr-2 cursor-pointer"
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
        )}
      </div>
    </div>
  );
}
