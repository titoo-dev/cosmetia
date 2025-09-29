"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, X, MessageCircle } from "lucide-react";
import * as XLSX from 'xlsx';
import { SupplierOrderItem } from "@/actions/supplier/orders/get-supplier-orders-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SupplierOrdersClientProps {
  orders: SupplierOrderItem[];
}

export default function SupplierOrdersClient({ orders }: SupplierOrdersClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | "ALL">("ALL");
  const [showFilters, setShowFilters] = useState(false);
  const [ordersList, setOrdersList] = useState(orders);

  console.log('orders', JSON.stringify(orders, null, 2));

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500 text-white";
      case "ACCEPTED":
        return "bg-green-500 text-white";
      case "DONE":
        return "bg-blue-500 text-white";
      case "REJECTED":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "PENDING":
        return "En attente";
      case "ACCEPTED":
        return "Accepté";
      case "DONE":
        return "Terminé";
      case "REJECTED":
        return "Refusé";
      default:
        return "Inconnu";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };


  const filteredOrders = ordersList.filter(order => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = (
      order.product.name.toLowerCase().includes(searchLower) ||
      order.customer.companyName.toLowerCase().includes(searchLower) ||
      order.customer.phoneNumber.toLowerCase().includes(searchLower)
    );

    const matchesStatus = statusFilter === "ALL" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const exportToExcel = () => {
    // Prepare data for export
    const exportData = filteredOrders.map((order, index) => ({
      '#': index + 1,
      'Acheteur': order.customer.companyName,
      'Email': order.customer.phoneNumber,
      'Date': formatDate(order.createdAt),
      'Nom du produit': order.product.name,
      'Quantité (Kg)': order.quantity,
      'Statut': getStatusLabel(order.status),
    }));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Set column widths
    const colWidths = [
      { wch: 5 },   // #
      { wch: 20 },  // Acheteur
      { wch: 25 },  // Email
      { wch: 20 },  // Date
      { wch: 30 },  // Nom du produit
      { wch: 15 },  // Quantité
      { wch: 18 },  // Statut
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
    XLSX.utils.book_append_sheet(wb, ws, "Devis");

    // Generate filename with current date
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const filename = `devis-${dateStr}.xlsx`;

    // Save file
    XLSX.writeFile(wb, filename);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto py-8">
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
                  className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#166970] focus:border-[#166970]"
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
                className="bg-[#166970] hover:bg-[#145a61] text-white border border-[#166970] flex items-center gap-2"
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
                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as string | "ALL")}>
                  <SelectTrigger className="w-full sm:w-64">
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">Tous les statuts</SelectItem>
                    <SelectItem value="PENDING">En attente</SelectItem>
                    <SelectItem value="ACCEPTED">Accepté</SelectItem>
                    <SelectItem value="DONE">Terminé</SelectItem>
                    <SelectItem value="REJECTED">Refusé</SelectItem>
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
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Acheteur</TableHead>
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Email</TableHead>
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Date</TableHead>
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Nom du produit</TableHead>
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Quantité</TableHead>
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 px-6 text-center text-gray-500">
                    Aucun devis trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={order.customer.picture} alt={order.customer.companyName} className='object-cover' />
                          <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                            {order.customer.companyName.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900">{order.customer.companyName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-700">
                      {order.customer.phoneNumber}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-700">
                      {formatDate(order.createdAt)}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-700">
                      <div className="font-medium">{order.product.name}</div>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-700">
                      {order.quantity} Kg
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

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6">
          <Button
            size="lg"
            className="bg-gray-800 hover:bg-gray-900 text-white rounded-full w-14 h-14 shadow-lg"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
