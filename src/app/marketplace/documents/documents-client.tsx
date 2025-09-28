"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Search } from "lucide-react";
import { DocumentEntity, ProductCategoryEntity, ProductCountryEntity, ProductFunctionEntity } from "@/lib/types/types";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface DocumentsClientProps {
    documents: DocumentEntity[];
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

export default function DocumentsClient({ 
    documents, 
    searchParams, 
    categories, 
    functions, 
    countries 
}: DocumentsClientProps) {
    const router = useRouter();
    const urlSearchParams = useSearchParams();
    
    const [documentSearchTerm, setDocumentSearchTerm] = useState(searchParams.query || "");
    const [documentFunction, setDocumentFunction] = useState(searchParams.functionId || "all");
    const [documentCategory, setDocumentCategory] = useState(searchParams.categoryId || "all");
    const [documentRegion, setDocumentRegion] = useState(searchParams.exportCountrieId || "all");
    const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);

    const handleDocumentCompare = (documentId: string) => {
        setSelectedDocuments(prev =>
            prev.includes(documentId)
                ? prev.filter(id => id !== documentId)
                : [...prev, documentId]
        );
    };

    const handleSearch = (value: string) => {
        setDocumentSearchTerm(value);
        const params = new URLSearchParams(urlSearchParams);
        if (value) {
            params.set('query', value);
        } else {
            params.delete('query');
        }
        router.push(`/customer/marketplace/documents?${params.toString()}`);
    };

    const handleFilterChange = (key: string, value: string) => {
        const params = new URLSearchParams(urlSearchParams);
        if (value && value !== "" && value !== "all") {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.push(`/customer/marketplace/documents?${params.toString()}`);
    };

    const getCompanyLogo = (companyName: string) => {
        const logos: { [key: string]: string } = {
            "Lancôme": "A+",
            "Nuxe": "TCL",
            "Biotherm": "B",
            "Givaudan": "G",
            "Estée Lauder": "E",
            "Vichy": "V",
            "Clinique": "C"
        };
        return logos[companyName] || companyName.charAt(0);
    };

    const getCompanyLogoColor = (companyName: string) => {
        const colors: { [key: string]: string } = {
            "Lancôme": "bg-red-500",
            "Nuxe": "bg-red-500",
            "Biotherm": "bg-blue-500",
            "Givaudan": "bg-red-500",
            "Estée Lauder": "bg-green-500",
            "Vichy": "bg-green-500",
            "Clinique": "bg-red-500"
        };
        return colors[companyName] || "bg-gray-500";
    };

    return (
        <div className="space-y-6">
            {/* Documents Search Bar */}
            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                    type="text"
                    placeholder="Recherche d'un document"
                    value={documentSearchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full max-w-md pl-12 pr-4 py-3 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                />
            </div>

            {/* Documents Filter Dropdowns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Select value={documentFunction} onValueChange={(value) => {
                    setDocumentFunction(value);
                    handleFilterChange('functionId', value);
                }}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Fonction" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Toutes les fonctions</SelectItem>
                        {functions.map((func) => (
                            <SelectItem key={func.id} value={func.id}>
                                {func.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={documentCategory} onValueChange={(value) => {
                    setDocumentCategory(value);
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

                <Select value={documentRegion} onValueChange={(value) => {
                    setDocumentRegion(value);
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

            {/* Document Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {documents.map((document) => (
                    <Card key={document.id} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
                        <CardContent className="p-4">
                            {/* Document Type and Company Info */}
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-medium text-gray-500 uppercase">
                                    Document
                                </span>
                                <div className={`w-8 h-8 ${getCompanyLogoColor(document.supplier?.companyName || 'Unknown')} rounded-full flex items-center justify-center`}>
                                    <span className="text-white text-xs font-bold">
                                        {getCompanyLogo(document.supplier?.companyName || 'Unknown')}
                                    </span>
                                </div>
                            </div>

                            {/* Company Name */}
                            <div className="mb-3">
                                <span className="text-sm font-medium text-gray-700">
                                    {document.supplier?.companyName || 'Unknown Supplier'}
                                </span>
                            </div>

                            {/* Document Title */}
                            <h3 className="font-bold text-sm text-gray-900 mb-3 line-clamp-2">
                                {document.name}
                            </h3>

                            {/* Description */}
                            <p className="text-xs text-gray-600 mb-4 line-clamp-3">
                                {document.description}
                            </p>

                            {/* Technical Sheet */}
                            {document.technicalSheet && (
                                <div className="mb-3">
                                    <p className="text-xs text-gray-500 mb-1">
                                        <strong>Technical Sheet:</strong>
                                    </p>
                                    <p className="text-xs text-gray-600 line-clamp-2">
                                        {document.technicalSheet}
                                    </p>
                                </div>
                            )}
                            {/* Compare Checkbox */}
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id={`compare-${document.id}`}
                                    checked={selectedDocuments.includes(document.id)}
                                    onChange={() => handleDocumentCompare(document.id)}
                                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                />
                                <label htmlFor={`compare-${document.id}`} className="text-sm text-gray-700 cursor-pointer">
                                    Comparer
                                </label>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* No Documents Message */}
            {documents.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No documents found matching your criteria.</p>
                </div>
            )}

            {/* Chat Button */}
            <div className="fixed bottom-6 right-6">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-full shadow-lg">
                    <MessageCircle className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
}
