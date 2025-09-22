"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Share2, Download, FileText } from "lucide-react";
import { useState } from "react";

interface Product {
    id: string;
    tradeName: string;
    description: string;
    inciName: string;
    certificate: string;
    pricePerQuantity: string;
    deliveryTime: string;
    regulationScore: number;
    minimumOrderQuantity: number;
    rating: number;
    supplier: {
        companyName: string;
    };
    categories: { name: string }[];
    functions: { name: string }[];
    exportCountries: { name: string }[];
}

interface Document {
    id: string;
    name: string;
    technicalSheet: string;
    description: string;
    fileUrl: string;
    documentType: "Fiche produit" | "Fiche technique";
}

// Mock data - in real app, this would come from API
const mockProduct: Product = {
    id: "1",
    tradeName: "OnyXen™ A34 Acérola (BN157030)",
    description: "OnyXen™ A34 Acérola est un extrait hydrosoluble standardisé du fruit d'Acerola (Malpighia glabra), riche en vitamine C naturelle et en antioxydants. Il est obtenu par un procédé d'extraction douce permettant de préserver les actifs bio-disponibles. Le produit se présente sous forme de liquide légèrement ambré, à odeur végétale caractéristique. pH optimal : 4,0 - 5,5.",
    inciName: "Malpighia Glabra (Acerola) Fruit Extract",
    certificate: "COSMOS Approved, Ecocert",
    pricePerQuantity: "10 $ / Kg",
    deliveryTime: "10 jours",
    regulationScore: 7,
    minimumOrderQuantity: 6,
    rating: 3,
    supplier: {
        companyName: "Givaudan"
    },
    categories: [{ name: "Extracts" }],
    functions: [{ name: "Antioxidant" }, { name: "Preservative" }],
    exportCountries: [{ name: "France" }]
};

const mockDocuments: Document[] = [
    {
        id: "1",
        name: "OnyXen™ A34 Acérola",
        technicalSheet: "Fiche technique",
        description: "Technical specifications for OnyXen™ A34 Acérola extract",
        fileUrl: "/documents/onyxen-acerola-tech.pdf",
        documentType: "Fiche technique"
    },
    {
        id: "2",
        name: "OnyXen™ A34 Acérola",
        technicalSheet: "Déclaration des ingrédients",
        description: "Ingredient declaration for OnyXen™ A34 Acérola",
        fileUrl: "/documents/onyxen-acerola-ingredients.pdf",
        documentType: "Fiche produit"
    }
];

export default function ProductDetailPage() {
    const [quantity, setQuantity] = useState("");
    const [quantityUnit, setQuantityUnit] = useState("Kg");
    const [isFavorite, setIsFavorite] = useState(false);

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
            />
        ));
    };

    const getCompanyLogo = (companyName: string) => {
        const logos: { [key: string]: string } = {
            "Givaudan": "G",
            "Symrise": "S",
            "Firmenich": "F",
            "Lancôme": "L",
            "Biotherm": "B"
        };
        return logos[companyName] || companyName.charAt(0);
    };

    const getCompanyLogoColor = (companyName: string) => {
        const colors: { [key: string]: string } = {
            "Givaudan": "bg-blue-600",
            "Symrise": "bg-purple-600",
            "Firmenich": "bg-green-600",
            "Lancôme": "bg-red-600",
            "Biotherm": "bg-blue-500"
        };
        return colors[companyName] || "bg-gray-600";
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Product Header */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                                {mockProduct.tradeName}
                            </h1>
                            
                            {/* Product Image */}
                            <div className="w-full h-64 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-32 h-32 bg-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                        <span className="text-gray-500 text-sm">Product Image</span>
                                    </div>
                                    <p className="text-sm text-gray-500">OnyXen™ A34 Acérola</p>
                                </div>
                            </div>

                            {/* Product Description */}
                            <p className="text-gray-700 leading-relaxed mb-6">
                                {mockProduct.description}
                            </p>

                            {/* Supplier Information */}
                            <div className="flex items-center space-x-3 mb-6">
                                <div className={`w-10 h-10 ${getCompanyLogoColor(mockProduct.supplier.companyName)} rounded-full flex items-center justify-center`}>
                                    <span className="text-white font-bold text-lg">
                                        {getCompanyLogo(mockProduct.supplier.companyName)}
                                    </span>
                                </div>
                                <span className="text-lg font-semibold text-gray-800">
                                    {mockProduct.supplier.companyName}
                                </span>
                            </div>
                        </div>

                        {/* Product Specifications */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Spécifications du produit</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600">Notation produit:</span>
                                    <div className="flex items-center space-x-1">
                                        {renderStars(mockProduct.rating)}
                                    </div>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600">Nutriscore:</span>
                                    <span className="font-semibold text-gray-900">4</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600">Nom INCI:</span>
                                    <span className="font-semibold text-gray-900">{mockProduct.inciName}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600">Fonctions du produit:</span>
                                    <div className="flex flex-wrap gap-1">
                                        {mockProduct.functions.map((func, index) => (
                                            <Badge key={index} variant="secondary" className="text-xs">
                                                {func.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600">Certificats:</span>
                                    <span className="font-semibold text-gray-900">{mockProduct.certificate}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600">Pays d'exportation:</span>
                                    <span className="font-semibold text-gray-900">
                                        {mockProduct.exportCountries.map(country => country.name).join(", ")}
                                    </span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600">Prix par quantité (avec MOQ):</span>
                                    <span className="font-semibold text-gray-900">{mockProduct.pricePerQuantity}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600">Délais de livraison:</span>
                                    <span className="font-semibold text-gray-900">{mockProduct.deliveryTime}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600">Score régulation:</span>
                                    <span className="font-semibold text-gray-900">{mockProduct.regulationScore}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600">Notation produit:</span>
                                    <span className="font-semibold text-gray-900">{mockProduct.rating}</span>
                                </div>
                            </div>
                        </div>

                        {/* Documents Section */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Documents</h2>
                            <div className="space-y-4">
                                {mockDocuments.map((document) => (
                                    <div key={document.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center space-x-3">
                                            <FileText className="w-5 h-5 text-gray-500" />
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {document.technicalSheet}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {document.name}
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="outline" size="sm" className="flex items-center space-x-2">
                                            <Download className="w-4 h-4" />
                                            <span>Voir</span>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quote Request Card */}
                        <Card className="bg-white shadow-sm">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Obtenir un devis</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                                            Quantité commandée:
                                        </label>
                                        <div className="flex space-x-2">
                                            <Input
                                                type="number"
                                                placeholder="Volume"
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                                className="flex-1"
                                            />
                                            <Select value={quantityUnit} onValueChange={setQuantityUnit}>
                                                <SelectTrigger className="w-20">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Kg">Kg</SelectItem>
                                                    <SelectItem value="L">L</SelectItem>
                                                    <SelectItem value="g">g</SelectItem>
                                                    <SelectItem value="ml">ml</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            La quantité minimale de commande est de {mockProduct.minimumOrderQuantity} unités
                                        </p>
                                    </div>
                                    
                                    <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3">
                                        Demander un devis
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <Button 
                                variant="outline" 
                                className="w-full flex items-center justify-center space-x-2"
                                onClick={() => setIsFavorite(!isFavorite)}
                            >
                                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
                                <span>Favoris</span>
                            </Button>
                            
                            <Button 
                                variant="outline" 
                                className="w-full flex items-center justify-center space-x-2"
                            >
                                <Share2 className="w-4 h-4 text-gray-500" />
                                <span>Partager</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
