"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, MessageCircle, Search, Star } from "lucide-react";
import { ProductCategoryEntity, ProductCountryEntity, ProductEntity, ProductFunctionEntity } from "@/lib/types/types";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

interface ProductsClientProps {
    products: ProductEntity[];
    searchParams: {
        query?: string;
        categoryId?: string;
        functionId?: string;
        exportCountrieId?: string;
    };
    categories: ProductCategoryEntity[];
    functions: ProductFunctionEntity[];
    countries: ProductCountryEntity[];
}

export default function ProductsClient({ products, searchParams, categories, functions, countries }: ProductsClientProps) {
    const router = useRouter();
    const urlSearchParams = useSearchParams();
    
    const [searchTerm, setSearchTerm] = useState(searchParams.query || "");
    const [selectedFunction, setSelectedFunction] = useState(searchParams.functionId || "");
    const [selectedCategory, setSelectedCategory] = useState(searchParams.categoryId || "");
    const [selectedRegion, setSelectedRegion] = useState(searchParams.exportCountrieId || "");

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        const params = new URLSearchParams(urlSearchParams);
        if (value) {
            params.set('query', value);
        } else {
            params.delete('query');
        }
        router.push(`/customer/marketplace/products?${params.toString()}`);
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
            />
        ));
    };

    const handleFilterChange = (key: string, value: string) => {
        const params = new URLSearchParams(urlSearchParams);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`/customer/marketplace/products?${params.toString()}`);
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
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full max-w-md pl-12 pr-4 py-3 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                />
            </div>

            {/* Products Filter Dropdowns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Select value={selectedFunction} onValueChange={(value) => {
                    setSelectedFunction(value);
                    handleFilterChange('functionId', value);
                }}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Fonction" />
                    </SelectTrigger>
                    <SelectContent>
                        {functions.map((func) => (
                            <SelectItem key={func.id} value={func.id}>
                                {func.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={selectedCategory} onValueChange={(value) => {
                    setSelectedCategory(value);
                    handleFilterChange('categoryId', value);
                }}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={selectedRegion} onValueChange={(value) => {
                    setSelectedRegion(value);
                    handleFilterChange('exportCountrieId', value);
                }}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pays" />
                    </SelectTrigger>
                    <SelectContent>
                        {countries.map((country) => (
                            <SelectItem key={country.id} value={country.id}>
                                {country.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {products.map((product) => (
                    <Card key={product.id} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 p-0">
                        <CardContent className="p-0">
                            {/* Product Image Placeholder */}
                            <div className="w-full h-48 bg-gray-200 rounded-tl-lg rounded-tr-lg mb-4 relative overflow-hidden">
                                {product.pictureUrl ? (
                                    <Image
                                        src={product.pictureUrl}
                                        alt={product.tradeName}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="text-gray-400 text-sm">Product Image</div>
                                    </div>
                                )}
                            </div>

                            {/* Company Info */}
                            <div className="flex items-center justify-between mb-3 px-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">
                                            {product.supplier?.companyName?.charAt(0) || 'N/A'}
                                        </span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">
                                        {product.supplier?.companyName || 'Unknown Supplier'}
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

                            {/* Categories and Functions */}
                            <div className="px-4 mb-3">
                                {product.categories && product.categories.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mb-2">
                                        {product.categories.slice(0, 2).map((category, index) => (
                                            <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                {category.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {product.functions && product.functions.length > 0 && (
                                    <div className="flex flex-wrap gap-1">
                                        {product.functions.slice(0, 2).map((func, index) => (
                                            <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                                {func.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Regulation Score */}
                            <div className="flex items-center space-x-1 mb-4 px-4">
                                {renderStars(product.regulationScore)}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* No Products Message */}
            {products.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                </div>
            )}

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
