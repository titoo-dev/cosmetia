"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Search, 
  Filter,
  Download,
  Eye,
  FileText,
  ShoppingBag,
  User,
  TrendingUp
} from "lucide-react";
import { getDashboardStatsAction, DashboardStats } from "@/actions/supplier/dashboard/get-dashboard-stats-action";
import { getSupplierLeadsAction, LeadWithDetails } from "@/actions/supplier/dashboard/get-supplier-leads-action";

const getCompanyInitials = (companyName: string) => {
  return companyName
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getCompanyLogo = (companyName: string) => {
  const logos: { [key: string]: string } = {
    "Avon Products": "🏢",
    "Baker Hughes Incorpora": "⚡",
    "NCR Corporation": "💼",
    "Acme Co.": "🏭",
    "Warephase": "📦",
    "Nam-zim": "✈️",
    "year-job": "💼",
    "Toughzap": "⚡"
  };
  return logos[companyName] || "🏢";
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(date));
};

export function DashboardClient() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [leads, setLeads] = useState<LeadWithDetails[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalLeads, setTotalLeads] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsResult, leadsResult] = await Promise.all([
          getDashboardStatsAction(),
          getSupplierLeadsAction(searchQuery, 1, 50)
        ]);
        
        setStats(statsResult);
        setLeads(leadsResult.leads);
        setTotalLeads(leadsResult.total);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [searchQuery]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setLoading(true);
    
    try {
      const leadsResult = await getSupplierLeadsAction(query, 1, 50);
      setLeads(leadsResult.leads);
      setTotalLeads(leadsResult.total);
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    // TODO: Implement CSV/Excel export functionality
    console.log("Export des leads");
  };

  if (loading && !stats) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                  <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                  <div className="h-8 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto ">
        {/* Stats Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Profile Stats */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Profil</h3>
              <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-purple-600">{stats?.profile.visits}</span>
                <span className="text-sm text-gray-600">Visites</span>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-purple-600">{stats?.profile.searchResults}</span>
                <span className="text-sm text-gray-600">Résultats de recherche</span>
              </div>
            </div>
          </div>

          {/* Products Stats */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Produits</h3>
              <div className="h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-yellow-600">{stats?.products.views}</span>
                <span className="text-sm text-gray-600">Vues</span>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-yellow-600">{stats?.products.searchResults}</span>
                <span className="text-sm text-gray-600">Résultats de recherche</span>
              </div>
            </div>
          </div>

          {/* Documents Stats */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
              <div className="h-10 w-10 rounded-full bg-cyan-500 flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-cyan-600">{stats?.documents.views}</span>
                <span className="text-sm text-gray-600">lectures</span>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-cyan-600">{stats?.documents.searchResults}</span>
                <span className="text-sm text-gray-600">Résultats de recherche</span>
              </div>
            </div>
          </div>
        </div>

        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900">
              Liste des leads <span className="text-gray-500 font-normal">(Total {totalLeads})</span>
            </h1>
            
            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Recherche"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#166970] focus:border-[#166970]"
                />
              </div>
              
              {/* Filter Button */}
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filtrer</span>
              </Button>
              
              {/* Export Button */}
              <Button 
                onClick={handleExport}
                className="bg-[#166970] hover:bg-[#0f4f50] text-white border border-[#166970] flex items-center gap-2"
              >
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
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Acheteur</TableHead>
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Email</TableHead>
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Date</TableHead>
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Adresse de l'IP</TableHead>
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Contexte</TableHead>
                <TableHead className="font-semibold text-gray-900 py-4 px-6">Produit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.length === 0 && !loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 px-6 text-center text-gray-500">
                    {searchQuery ? "Aucun lead trouvé pour cette recherche" : "Aucun lead disponible"}
                  </TableCell>
                </TableRow>
              ) : loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 px-6 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#166970]"></div>
                      <span className="text-gray-500">Chargement...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                leads.map((lead) => (
                  <TableRow key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs font-medium bg-[#166970] text-white">
                            {getCompanyInitials(lead.customerCompanyName)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-gray-900">
                          {lead.customerCompanyName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-700">
                      {lead.customerEmail}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-700">
                      {formatDate(lead.date)}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-gray-700">
                      {lead.ipAddress}
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <Badge 
                        className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100"
                      >
                        {lead.contextLabel}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 px-6 font-medium text-[#166970]">
                      {lead.productName}
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
