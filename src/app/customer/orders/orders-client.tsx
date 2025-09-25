"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download } from "lucide-react";
import { OrderEntity, OrderStatus } from "@/lib/types/types";

interface OrdersClientProps {
  orders: OrderEntity[];
}

export default function OrdersClient({ orders }: OrdersClientProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadgeStyle = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.FORMULA_PENDING:
        return "bg-yellow-500 text-white";
      case OrderStatus.FORMULA_ACCEPTED:
        return "bg-green-500 text-white";
      case OrderStatus.FORMULA_REJECTED:
        return "bg-red-500 text-white";
      case OrderStatus.CANCELLED:
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.FORMULA_PENDING:
        return "En attente";
      case OrderStatus.FORMULA_ACCEPTED:
        return "Formule acceptée";
      case OrderStatus.FORMULA_REJECTED:
        return "Formule rejetée";
      case OrderStatus.CANCELLED:
        return "Annulé";
      default:
        return "Inconnu";
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredOrders = orders.filter(order => {
    const searchLower = searchTerm.toLowerCase();
    return (
      order.reference.toLowerCase().includes(searchLower) ||
      order.finalResultName.toLowerCase().includes(searchLower) ||
      order.finalResultFamily.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900">Liste des commandes</h1>
            
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
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Référence</TableHead>
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Produit final</TableHead>
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Quantité</TableHead>
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Coût estimé</TableHead>
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 px-6 text-center text-gray-500">
                    Aucune commande trouvée
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <TableCell className="py-4 px-6 text-gray-700">
                      {formatDate(order.createdAt)}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-700 font-medium">
                      {order.reference}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-700">
                      <div>
                        <div className="font-medium">{order.finalResultName}</div>
                        <div className="text-sm text-gray-500">{order.finalResultFamily}</div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-700">
                      {order.finalResultQuantity} L
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-700">
                      {order.estimatedTotalCost.toFixed(2)} €
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <Badge 
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeStyle(order.status)}`}
                      >
                        {getStatusLabel(order.status)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
