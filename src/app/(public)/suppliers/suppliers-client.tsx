"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MessageCircle, CheckCircle, MapPin, Package, FileText } from "lucide-react";
import { ProductCategoryEntity, ProductCountryEntity, SupplierUserEntity } from "@/lib/types/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

interface SuppliersClientProps {
    suppliers: SupplierUserEntity[];
    searchParams: {
        query?: string;
        category?: string;
        region?: string;
    };
    categories: ProductCategoryEntity[];
    countries: ProductCountryEntity[];
}

export default function SuppliersClient({ suppliers, searchParams, categories, countries }: SuppliersClientProps) {
    const router = useRouter();
    const urlSearchParams = useSearchParams();

    const [searchTerm, setSearchTerm] = useState(searchParams.query || "");
    const [selectedCategory, setSelectedCategory] = useState(searchParams.category || "all");
    const [selectedRegion, setSelectedRegion] = useState(searchParams.region || "all");

    const getCertificationIcon = (plan: string) => {
        if (plan === "GROWTH" || plan === "PAY_AS_YOU_GO") {
            return <CheckCircle className="w-4 h-4 text-green-500" />;
        }
        return null;
    };

    const getCertificationColor = (plan: string) => {
        switch (plan) {
            case "GROWTH":
                return "text-green-600";
            case "PAY_AS_YOU_GO":
                return "text-green-600";
            case "FREE":
                return "text-yellow-600";
            default:
                return "text-gray-600";
        }
    };

    const getCertificationStatus = (plan: string) => {
        switch (plan) {
            case "GROWTH":
                return "Certifié";
            case "PAY_AS_YOU_GO":
                return "VerifyPlus";
            case "FREE":
                return "En attente";
            default:
                return "En attente";
        }
    };

    const getLogoText = (companyName: string) => {
        return companyName.substring(0, 2).toUpperCase();
    };

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        const params = new URLSearchParams(urlSearchParams);
        if (value) {
            params.set('query', value);
        } else {
            params.delete('query');
        }
        router.push(`/customer/suppliers?${params.toString()}`);
    };

    const handleFilterChange = (key: string, value: string) => {
        const params = new URLSearchParams(urlSearchParams);
        if (value && value !== "" && value !== "all") {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`/customer/suppliers?${params.toString()}`);
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
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full max-w-md pl-12 pr-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                        />
                    </div>

                    {/* Filter Dropdowns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-md">
                        <Select value={selectedCategory} onValueChange={(value) => {
                            setSelectedCategory(value);
                            handleFilterChange('categoryId', value);
                        }}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Catégorie" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Toutes les catégories</SelectItem>
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
                                <SelectItem value="all">Tous les pays</SelectItem>
                                {countries.map((country) => (
                                    <SelectItem key={country.id} value={country.id}>
                                        {country.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Supplier Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {suppliers.map((supplier) => (
                        <Link href={`/suppliers/${supplier.id}`} key={supplier.id}>
                            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 p-0 cursor-pointer">
                                <CardContent className="p-0">
                                {/* Supplier Image Placeholder */}
                                <div className="w-full h-48 bg-gray-200 rounded-tl-lg rounded-tr-lg mb-4 flex items-center justify-center relative overflow-hidden">
                                    <Image
                                        src={supplier.coverPhotoUrl || '/placeholder-supplier.jpg'}
                                        alt={`${supplier.companyName} supplier image`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Company Logo */}
                                <div className="relative -mt-8 ml-4 mb-4">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg bg-white overflow-hidden">
                                        {supplier.pictureUrl ? (
                                            <Image
                                                src={supplier.pictureUrl}
                                                alt={supplier.companyName}
                                                width={48}
                                                height={48}
                                                className="object-cover w-12 h-12 rounded-full"
                                            />
                                        ) : (
                                            <span className="text-gray-400 text-xs font-bold text-center">
                                                {getLogoText(supplier.companyName)}
                                            </span>
                                        )}
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
                                        <span className="text-sm text-gray-600">QG: France</span>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center space-x-1">
                                            <Package className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-600">
                                                {supplier.products?.length || 0} produits
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <FileText className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-600">
                                                {supplier.documents?.length || 0} documents
                                            </span>
                                        </div>
                                    </div>

                                    {/* Certification Status */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center space-x-1">
                                            {getCertificationIcon(supplier.currentPlan)}
                                            <span className={`text-sm font-medium ${getCertificationColor(supplier.currentPlan)}`}>
                                                {getCertificationStatus(supplier.currentPlan)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-gray-600 line-clamp-3">
                                        {supplier.activityDescription}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                        </Link>
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
