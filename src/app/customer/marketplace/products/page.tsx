"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, MessageCircle, Search, Star } from "lucide-react";
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
    supplier: {
        companyName: string;
    };
    categories: { name: string }[];
    functions: { name: string }[];
    rating: number;
}

const dummyProducts: Product[] = [
    {
        id: "1",
        tradeName: "Huile de coco",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        inciName: "Cocos Nucifera Oil",
        certificate: "Certified",
        pricePerQuantity: "€15/kg",
        deliveryTime: "3-5 days",
        regulationScore: 3,
        minimumOrderQuantity: 10,
        supplier: { companyName: "Givaudan" },
        categories: [{ name: "Oils" }],
        functions: [{ name: "Emollient" }],
        rating: 3
    },
    {
        id: "2",
        tradeName: "Huile d'argan",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        inciName: "Argania Spinosa Kernel Oil",
        certificate: "Certified",
        pricePerQuantity: "€25/kg",
        deliveryTime: "5-7 days",
        regulationScore: 4,
        minimumOrderQuantity: 5,
        supplier: { companyName: "Givaudan" },
        categories: [{ name: "Oils" }],
        functions: [{ name: "Antioxidant" }],
        rating: 3
    },
    {
        id: "3",
        tradeName: "Beurre de karité",
        description: "Anti-inflammatoire, Digestif",
        inciName: "Butyrospermum Parkii Butter",
        certificate: "Certified",
        pricePerQuantity: "€20/kg",
        deliveryTime: "7-10 days",
        regulationScore: 4,
        minimumOrderQuantity: 15,
        supplier: { companyName: "Symrise" },
        categories: [{ name: "Butters" }],
        functions: [{ name: "Anti-inflammatory" }, { name: "Digestive" }],
        rating: 3
    },
    {
        id: "4",
        tradeName: "Acide hyaluronique",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        inciName: "Hyaluronic Acid",
        certificate: "Certified",
        pricePerQuantity: "€50/100ml",
        deliveryTime: "2-3 days",
        regulationScore: 5,
        minimumOrderQuantity: 5,
        supplier: { companyName: "Givaudan" },
        categories: [{ name: "Active Ingredients" }],
        functions: [{ name: "Moisturizing" }],
        rating: 3
    },
    {
        id: "5",
        tradeName: "Glycérine végétale",
        description: "Antioxydant, Anti-inflammatoire",
        inciName: "Glycerin",
        certificate: "Certified",
        pricePerQuantity: "€8/kg",
        deliveryTime: "1-2 days",
        regulationScore: 4,
        minimumOrderQuantity: 20,
        supplier: { companyName: "Firmenich" },
        categories: [{ name: "Humectants" }],
        functions: [{ name: "Antioxidant" }, { name: "Anti-inflammatory" }],
        rating: 4
    },
    {
        id: "6",
        tradeName: "Extrait de camomille",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        inciName: "Chamomilla Recutita Extract",
        certificate: "Certified",
        pricePerQuantity: "€30/100ml",
        deliveryTime: "4-6 days",
        regulationScore: 3,
        minimumOrderQuantity: 8,
        supplier: { companyName: "Biotherm" },
        categories: [{ name: "Extracts" }],
        functions: [{ name: "Soothing" }],
        rating: 3
    },
    {
        id: "7",
        tradeName: "Extrait de concombre",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        inciName: "Cucumis Sativus Extract",
        certificate: "Certified",
        pricePerQuantity: "€25/100ml",
        deliveryTime: "3-5 days",
        regulationScore: 3,
        minimumOrderQuantity: 10,
        supplier: { companyName: "Lancôme" },
        categories: [{ name: "Extracts" }],
        functions: [{ name: "Cooling" }],
        rating: 3
    },
    {
        id: "8",
        tradeName: "Huile essentielle de citron",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        inciName: "Citrus Limon Oil",
        certificate: "Certified",
        pricePerQuantity: "€40/100ml",
        deliveryTime: "2-4 days",
        regulationScore: 4,
        minimumOrderQuantity: 5,
        supplier: { companyName: "Givaudan" },
        categories: [{ name: "Essential Oils" }],
        functions: [{ name: "Fragrance" }],
        rating: 4
    }
];

export default function ProductsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFunction, setSelectedFunction] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedFinalUse, setSelectedFinalUse] = useState("");

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
            />
        ));
    };

    return (
        <div className="space-y-6">
            {/* Products Search Bar */}
            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                    type="text"
                    placeholder="Recherche d'un ingrédient"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md pl-12 pr-4 py-3 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                />
            </div>

            {/* Products Filter Dropdowns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Select value={selectedFunction} onValueChange={setSelectedFunction}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Fonction" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="emollient">Emollient</SelectItem>
                        <SelectItem value="antioxidant">Antioxidant</SelectItem>
                        <SelectItem value="anti-inflammatory">Anti-inflammatory</SelectItem>
                        <SelectItem value="moisturizing">Moisturizing</SelectItem>
                        <SelectItem value="soothing">Soothing</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="oils">Oils</SelectItem>
                        <SelectItem value="butters">Butters</SelectItem>
                        <SelectItem value="extracts">Extracts</SelectItem>
                        <SelectItem value="essential-oils">Essential Oils</SelectItem>
                        <SelectItem value="active-ingredients">Active Ingredients</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Région" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="europe">Europe</SelectItem>
                        <SelectItem value="asia">Asia</SelectItem>
                        <SelectItem value="africa">Africa</SelectItem>
                        <SelectItem value="americas">Americas</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={selectedFinalUse} onValueChange={setSelectedFinalUse}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Utilisation finale" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="skincare">Skincare</SelectItem>
                        <SelectItem value="haircare">Haircare</SelectItem>
                        <SelectItem value="makeup">Makeup</SelectItem>
                        <SelectItem value="fragrance">Fragrance</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {dummyProducts.map((product) => (
                    <Card key={product.id} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 p-0">
                        <CardContent className="p-0">
                            {/* Product Image Placeholder */}
                            <div className="w-full h-48 bg-gray-200 rounded-tl-lg rounded-tr-lg mb-4 flex items-center justify-center">
                                <div className="text-gray-400 text-sm">Product Image</div>
                            </div>

                            {/* Company Info */}
                            <div className="flex items-center justify-between mb-3 px-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">
                                            {product.supplier.companyName.charAt(0)}
                                        </span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">
                                        {product.supplier.companyName}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span className="text-xs text-green-600 font-medium">Certifier</span>
                                </div>
                            </div>

                            {/* Product Name */}
                            <h3 className="font-bold text-lg text-gray-900 mb-2 px-4">
                                {product.tradeName}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2 px-4">
                                {product.description}
                            </p>

                            {/* Rating */}
                            <div className="flex items-center space-x-1 mb-4 px-4">
                                {renderStars(product.rating)}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Order with Assistance Button */}
            <div className="fixed bottom-6 right-6 flex items-center space-x-3">
                <Button className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg shadow-lg">
                    Commander avec assistance
                </Button>
                <Button className="bg-green-700 hover:bg-green-800 text-white p-3 rounded-full shadow-lg">
                    <MessageCircle className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
}
