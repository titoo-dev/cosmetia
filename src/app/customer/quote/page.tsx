"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download } from "lucide-react";

interface Quote {
  id: string;
  date: string;
  product: string;
  quantity: string;
  status: "En attente" | "Formule vérifié" | "Terminé" | "Annulé";
}

const dummyQuotes: Quote[] = [
  {
    id: "1",
    date: "Dec 7, 2019 23:26",
    product: "Glycérine végétale",
    quantity: "20 Kg",
    status: "En attente"
  },
  {
    id: "2",
    date: "Mar 20, 2019 23:14",
    product: "Glycérine végétale",
    quantity: "0.5 L",
    status: "En attente"
  },
  {
    id: "3",
    date: "Feb 2, 2019 19:28",
    product: "Huile d'argan",
    quantity: "4 L",
    status: "Formule vérifié"
  },
  {
    id: "4",
    date: "Dec 7, 2019 23:26",
    product: "Huile de coco",
    quantity: "6 L",
    status: "Formule vérifié"
  },
  {
    id: "5",
    date: "Mar 20, 2019 23:14",
    product: "Glycérine végétale",
    quantity: "20 Kg",
    status: "En attente"
  },
  {
    id: "6",
    date: "Dec 7, 2019 23:26",
    product: "Acide hyaluronique",
    quantity: "0.1 L",
    status: "Terminé"
  },
  {
    id: "7",
    date: "Feb 2, 2019 19:28",
    product: "Glycérine végétale",
    quantity: "2 Kg",
    status: "En attente"
  },
  {
    id: "8",
    date: "Dec 7, 2019 23:26",
    product: "Acide hyaluronique",
    quantity: "0.1 L",
    status: "Annulé"
  },
  {
    id: "9",
    date: "Dec 30, 2019 05:18",
    product: "Huile d'argan",
    quantity: "3 L",
    status: "En attente"
  }
];

export default function QuotePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "En attente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Formule vérifié":
        return "bg-green-100 text-green-800 border-green-200";
      case "Terminé":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
      case "Annulé":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "En attente":
        return "bg-yellow-500 text-white";
      case "Formule vérifié":
        return "bg-green-500 text-white";
      case "Terminé":
        return "bg-cyan-500 text-white";
      case "Annulé":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900">Liste des devis</h1>
            
            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Recherche"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              {/* Filter Button */}
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filtrer</span>
              </Button>
              
              {/* Export Button */}
              <Button className="bg-green-600 hover:bg-green-700 text-white border border-green-700 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Exporter
              </Button>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Date</TableHead>
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Produit</TableHead>
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Quantité</TableHead>
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyQuotes.map((quote) => (
                <TableRow key={quote.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <TableCell className="py-4 px-6 text-gray-700">
                    {quote.date}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-gray-700 font-medium">
                    {quote.product}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-gray-700">
                    {quote.quantity}
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <Badge 
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeStyle(quote.status)}`}
                    >
                      {quote.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
