"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, X } from "lucide-react";
import * as XLSX from 'xlsx';
import { OrderEntity, OrderStatus } from "@/lib/types/types";

interface OrdersClientProps {
  orders: OrderEntity[];
}

export default function OrdersClient({ orders }: OrdersClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "ALL">("ALL");
  const [showFilters, setShowFilters] = useState(false);

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
    const matchesSearch = (
      order.reference.toLowerCase().includes(searchLower) ||
      order.orderItems.map((item) => item.product.name).join(', ').toLowerCase().includes(searchLower)
    );
    
    const matchesStatus = statusFilter === "ALL" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const exportToExcel = () => {
    // Prepare data for export
    const exportData = filteredOrders.map((order, index) => ({
      '#': index + 1,
      'Référence': order.reference,
      'Date de création': formatDate(order.createdAt),
      'Produit(s)': order.orderItems.map((item) => item.product.name).join(', '),
      'Quantité (Kg)': order.orderItems[0]?.quantity || 0,
      'Coût estimé (€)': order.estimatedTotalCost.toFixed(2),
      'Statut': getStatusLabel(order.status),
      'Résultat final - Famille': order.finalResultFamily,
      'Résultat final - Nom': order.finalResultName,
      'Quantité finale': order.finalResultQuantity,
      'Marché cible': order.targetMarket,
      'Angle marketing': order.marketingAngle,
      'Type d\'emballage': order.packagingType,
    }));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Set column widths
    const colWidths = [
      { wch: 5 },   // #
      { wch: 15 },  // Référence
      { wch: 20 },  // Date de création
      { wch: 30 },  // Produit(s)
      { wch: 15 },  // Quantité
      { wch: 15 },  // Coût estimé
      { wch: 18 },  // Statut
      { wch: 25 },  // Résultat final - Famille
      { wch: 25 },  // Résultat final - Nom
      { wch: 15 },  // Quantité finale
      { wch: 20 },  // Marché cible
      { wch: 25 },  // Angle marketing
      { wch: 18 },  // Type d'emballage
    ];
    ws['!cols'] = colWidths;

    // Add header styling
    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
    for (let col = range.s.c; col <= range.e.c; col++) {
      const headerCell = XLSX.utils.encode_cell({ r: 0, c: col });
      if (!ws[headerCell]) continue;
      
      ws[headerCell].s = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "059669" } }, // Green background
        alignment: { horizontal: "center", vertical: "center" },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } }
        }
      };
    }

    // Add data row styling
    for (let row = 1; row <= range.e.r; row++) {
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
        if (!ws[cellRef]) continue;
        
        ws[cellRef].s = {
          alignment: { horizontal: "left", vertical: "center" },
          border: {
            top: { style: "thin", color: { rgb: "E5E7EB" } },
            bottom: { style: "thin", color: { rgb: "E5E7EB" } },
            left: { style: "thin", color: { rgb: "E5E7EB" } },
            right: { style: "thin", color: { rgb: "E5E7EB" } }
          }
        };

        // Alternate row background
        if (row % 2 === 0) {
          ws[cellRef].s.fill = { fgColor: { rgb: "F9FAFB" } };
        }
      }
    }

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Commandes");

    // Generate filename with current date
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const filename = `commandes-${dateStr}.xlsx`;

    // Save file
    XLSX.writeFile(wb, filename);
  };

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
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filtrer</span>
              </Button>
              
              {/* Export Button */}
              <Button 
                onClick={exportToExcel}
                className="bg-green-600 hover:bg-green-700 text-white border border-green-700 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Exporter
              </Button>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filtrer par statut
                </label>
                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as OrderStatus | "ALL")}>
                  <SelectTrigger className="w-full sm:w-64">
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Tous les statuts</SelectItem>
                    <SelectItem value={OrderStatus.FORMULA_PENDING}>En attente</SelectItem>
                    <SelectItem value={OrderStatus.FORMULA_ACCEPTED}>Formule acceptée</SelectItem>
                    <SelectItem value={OrderStatus.FORMULA_REJECTED}>Formule rejetée</SelectItem>
                    <SelectItem value={OrderStatus.CANCELLED}>Annulé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Clear Filters */}
              {(statusFilter !== "ALL" || searchTerm) && (
                <div className="flex items-end">
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      setStatusFilter("ALL");
                      setSearchTerm("");
                    }}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                  >
                    <X className="w-4 h-4" />
                    Effacer les filtres
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Date</TableHead>
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Produit</TableHead>
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
                    <TableCell className="py-4 px-6 text-gray-700">
                      <div>
                        <div className="font-medium">{order.orderItems.map((item) => item.product.name).join(', ')}</div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-700">
                      {order.orderItems[0].quantity} Kg
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
