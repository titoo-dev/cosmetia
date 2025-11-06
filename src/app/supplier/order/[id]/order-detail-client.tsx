"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Package, Calendar, ChevronLeft, CheckCircle2, XCircle, Clock, User, Layers } from "lucide-react";
import { SupplierOrderItem } from "@/actions/supplier/orders/get-supplier-orders-action";
import Link from "next/link";
import Image from "next/image";

interface OrderDetailClientProps {
  order: SupplierOrderItem;
}

export default function OrderDetailClient({ order }: OrderDetailClientProps) {
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

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "PENDING":
        return {
          label: "En attente",
          description: "Le devis est en attente de votre réponse",
          color: "bg-yellow-500",
          icon: Clock,
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-700",
          borderColor: "border-yellow-200"
        };
      case "ACCEPTED":
        return {
          label: "Accepté",
          description: "Vous avez accepté ce devis",
          color: "bg-green-500",
          icon: CheckCircle2,
          bgColor: "bg-green-50",
          textColor: "text-green-700",
          borderColor: "border-green-200"
        };
      case "DONE":
        return {
          label: "Terminé",
          description: "Ce devis est terminé",
          color: "bg-blue-500",
          icon: CheckCircle2,
          bgColor: "bg-blue-50",
          textColor: "text-blue-700",
          borderColor: "border-blue-200"
        };
      case "REJECTED":
        return {
          label: "Refusé",
          description: "Vous avez refusé ce devis",
          color: "bg-red-500",
          icon: XCircle,
          bgColor: "bg-red-50",
          textColor: "text-red-700",
          borderColor: "border-red-200"
        };
      default:
        return {
          label: "Inconnu",
          description: "Statut inconnu",
          color: "bg-gray-500",
          icon: Clock,
          bgColor: "bg-gray-50",
          textColor: "text-gray-700",
          borderColor: "border-gray-200"
        };
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F4EF] via-white to-[#F7F4EF]">
      <div className="max-w-[1400px] mx-auto p-6 space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <Link href="/supplier/orders">
            <Button variant="ghost" size="sm" className="gap-2 hover:bg-white">
              <ChevronLeft className="w-4 h-4" />
              Retour
            </Button>
          </Link>
          <div className="h-6 w-px bg-gray-300" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Détails du devis</h1>
            <p className="text-sm text-gray-500">Référence: {order.id.substring(0, 8).toUpperCase()}</p>
          </div>
        </div>

        {/* Order Status Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            {/* Current Status */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`${getStatusInfo(order.status).bgColor} p-3 rounded-xl ${getStatusInfo(order.status).borderColor} border-2`}>
                  {(() => {
                    const StatusIcon = getStatusInfo(order.status).icon;
                    return <StatusIcon className={`w-6 h-6 ${getStatusInfo(order.status).textColor}`} />;
                  })()}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Statut: {getStatusInfo(order.status).label}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {getStatusInfo(order.status).description}
                  </p>
                </div>
              </div>
              <Badge className={`${getStatusInfo(order.status).color} text-white px-4 py-2 text-sm font-semibold shadow-sm`}>
                {getStatusInfo(order.status).label}
              </Badge>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Section - Customer & Product Details */}
          <div className="space-y-6">
            {/* Customer Information Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-white px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Informations client
                </h3>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 bg-gradient-to-r from-blue-50 to-transparent p-4 rounded-lg mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#166970] to-[#1a7a82] flex items-center justify-center shadow-sm overflow-hidden">
                    {order.customer.picture ? (
                      <Image 
                        src={order.customer.picture} 
                        alt={order.customer.companyName} 
                        width={64}
                        height={64}
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <span className="text-white font-bold text-xl">
                        {order.customer.companyName.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-lg">{order.customer.companyName}</p>
                    <p className="text-sm text-gray-500">{order.customer.nameOfContact}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Téléphone</p>
                      <p className="font-medium text-gray-900">{order.customer.phoneNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Package className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Objectif d'achat</p>
                      <p className="font-medium text-gray-900">{order.customer.purchaseObjective}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Date de demande</p>
                      <p className="font-medium text-gray-900">{formatDate(order.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Product Details */}
          <div className="space-y-6">
            {/* Product Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-50 to-white px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Package className="w-5 h-5 text-orange-600" />
                  Détails du produit
                </h3>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200 relative">
                    {order.product.picture ? (
                      <Image 
                        src={order.product.picture} 
                        alt={order.product.name} 
                        fill
                        className="object-cover" 
                      />
                    ) : (
                      <Package className="w-10 h-10 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{order.product.name}</h4>
                    <p className="text-sm text-gray-500">ID: {order.product.id.substring(0, 12)}...</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-[#166970] to-[#1a7a82] rounded-lg p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm opacity-90 mb-1">Quantité demandée</p>
                        <p className="text-3xl font-bold">{order.quantity} kg</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <Layers className="w-8 h-8" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Statut</span>
                    <Badge className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${getStatusBadgeStyle(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </Badge>
                  </div>
                </div>

                {/* Action Buttons */}
                {order.status === "PENDING" && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-4">Répondre à cette demande :</p>
                    <div className="flex gap-3">
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Accepter
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-red-200 text-red-700 hover:bg-red-50"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Refuser
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
