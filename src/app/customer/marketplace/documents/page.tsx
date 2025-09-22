"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Search } from "lucide-react";
import { useState } from "react";

interface Document {
    id: string;
    name: string;
    technicalSheet: string;
    description: string;
    fileUrl: string;
    supplier: {
        companyName: string;
    };
    documentType: "Fiche produit" | "Fiche technique";
}

const dummyDocuments: Document[] = [
    {
        id: "1",
        name: "Masque hydratant Énergie de Vie - 98765wxyz France - Liste des ingrédients",
        technicalSheet: "Technical specifications for Lancôme's hydrating mask",
        description: "Masque hydratant à l'extrait de rose pour une peau éclatante et hydratée. Formule enrichie en acide hyaluronique pour une hydratation intense.",
        fileUrl: "/documents/lancome-masque.pdf",
        supplier: { companyName: "Lancôme" },
        documentType: "Fiche produit"
    },
    {
        id: "2",
        name: "Huile Prodigieuse - 13579hjkl France - Liste des ingrédients",
        technicalSheet: "Technical specifications for Nuxe's multi-purpose oil",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fileUrl: "/documents/nuxe-huile.pdf",
        supplier: { companyName: "Nuxe" },
        documentType: "Fiche produit"
    },
    {
        id: "3",
        name: "Crème réparatrice Aquasource - 24680mnop France - Liste des ingrédients",
        technicalSheet: "Technical specifications for Biotherm's reparative cream",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fileUrl: "/documents/biotherm-creme.pdf",
        supplier: { companyName: "Biotherm" },
        documentType: "Fiche produit"
    },
    {
        id: "4",
        name: "Farine de riz HOMECRAFT® Create 835 - 34121D00 États-Unis - Liste des ingrédients",
        technicalSheet: "Technical specifications for Givaudan's rice flour ingredient",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fileUrl: "/documents/givaudan-farine.pdf",
        supplier: { companyName: "Givaudan" },
        documentType: "Fiche technique"
    },
    {
        id: "5",
        name: "Farine de riz HOMECRAFT® Create 835 - 34121D00 États-Unis - Liste des ingrédients",
        technicalSheet: "Technical specifications for Givaudan's rice flour ingredient",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fileUrl: "/documents/givaudan-farine-2.pdf",
        supplier: { companyName: "Givaudan" },
        documentType: "Fiche technique"
    },
    {
        id: "6",
        name: "Sérum Advanced Night Repair - 45678abcdef France - Liste des ingrédients",
        technicalSheet: "Technical specifications for Estée Lauder's night serum",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fileUrl: "/documents/estee-lauder-serum.pdf",
        supplier: { companyName: "Estée Lauder" },
        documentType: "Fiche produit"
    },
    {
        id: "7",
        name: "Lotion Minéralisante - 12345xyzabc France - Liste des ingrédients",
        technicalSheet: "Technical specifications for Vichy's mineralizing lotion",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fileUrl: "/documents/vichy-lotion.pdf",
        supplier: { companyName: "Vichy" },
        documentType: "Fiche produit"
    },
    {
        id: "8",
        name: "Hydratant Dramatically Different - 78901ijklmn France - Liste des ingrédients",
        technicalSheet: "Technical specifications for Clinique's hydrating moisturizer",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fileUrl: "/documents/clinique-hydratant.pdf",
        supplier: { companyName: "Clinique" },
        documentType: "Fiche produit"
    },
    {
        id: "9",
        name: "Extrait de rose - 54321qwerty France - Liste des ingrédients",
        technicalSheet: "Technical specifications for Lancôme's rose extract",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fileUrl: "/documents/lancome-rose.pdf",
        supplier: { companyName: "Lancôme" },
        documentType: "Fiche technique"
    },
    {
        id: "10",
        name: "Huile essentielle de lavande - 98765asdfgh France - Liste des ingrédients",
        technicalSheet: "Technical specifications for Nuxe's lavender essential oil",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fileUrl: "/documents/nuxe-lavande.pdf",
        supplier: { companyName: "Nuxe" },
        documentType: "Fiche technique"
    },
    {
        id: "11",
        name: "Algues marines - 13579zxcvbn France - Liste des ingrédients",
        technicalSheet: "Technical specifications for Biotherm's marine algae",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fileUrl: "/documents/biotherm-algues.pdf",
        supplier: { companyName: "Biotherm" },
        documentType: "Fiche technique"
    },
    {
        id: "12",
        name: "Parfum Signature - 24680mnbvcx France - Liste des ingrédients",
        technicalSheet: "Technical specifications for Givaudan's signature fragrance",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fileUrl: "/documents/givaudan-parfum.pdf",
        supplier: { companyName: "Givaudan" },
        documentType: "Fiche technique"
    }
];

export default function DocumentsPage() {
    const [documentSearchTerm, setDocumentSearchTerm] = useState("");
    const [documentFunction, setDocumentFunction] = useState("");
    const [documentCategory, setDocumentCategory] = useState("");
    const [documentRegion, setDocumentRegion] = useState("");
    const [documentFinalUse, setDocumentFinalUse] = useState("");
    const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);

    const handleDocumentCompare = (documentId: string) => {
        setSelectedDocuments(prev =>
            prev.includes(documentId)
                ? prev.filter(id => id !== documentId)
                : [...prev, documentId]
        );
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
                    onChange={(e) => setDocumentSearchTerm(e.target.value)}
                    className="w-full max-w-md pl-12 pr-4 py-3 text-sm border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                />
            </div>

            {/* Documents Filter Dropdowns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Select value={documentFunction} onValueChange={setDocumentFunction}>
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

                <Select value={documentCategory} onValueChange={setDocumentCategory}>
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

                <Select value={documentRegion} onValueChange={setDocumentRegion}>
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

                <Select value={documentFinalUse} onValueChange={setDocumentFinalUse}>
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

            {/* Document Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {dummyDocuments.map((document) => (
                    <Card key={document.id} className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
                        <CardContent className="p-4">
                            {/* Document Type and Company Info */}
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-medium text-gray-500 uppercase">
                                    {document.documentType}
                                </span>
                                <div className={`w-8 h-8 ${getCompanyLogoColor(document.supplier.companyName)} rounded-full flex items-center justify-center`}>
                                    <span className="text-white text-xs font-bold">
                                        {getCompanyLogo(document.supplier.companyName)}
                                    </span>
                                </div>
                            </div>

                            {/* Company Name */}
                            <div className="mb-3">
                                <span className="text-sm font-medium text-gray-700">
                                    {document.supplier.companyName}
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

            {/* Chat Button */}
            <div className="fixed bottom-6 right-6">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-full shadow-lg">
                    <MessageCircle className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
}
