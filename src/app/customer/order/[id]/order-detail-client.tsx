"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Mail, Send, Package, Calendar, ShoppingBag, TrendingUp, Target, Layers, ChevronLeft, CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";
import { OrderEntity, OrderItemStatus, PackagingType, OrderStatus } from "@/lib/types/types";
import { addOrderCommentAction } from "@/actions/customer/orders/[id]/add-order-comment-action";
import { toast } from "sonner";
import Link from "next/link";

interface OrderDetailClientProps {
  order: OrderEntity;
}

export default function OrderDetailClient({ order: initialOrder }: OrderDetailClientProps) {
  const [order, setOrder] = useState(initialOrder);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isPending, startTransition] = useTransition();

  const getStatusBadgeStyle = (status: OrderItemStatus) => {
    switch (status) {
      case OrderItemStatus.PENDING:
        return "bg-yellow-500 text-white";
      case OrderItemStatus.ACCEPTED:
        return "bg-green-500 text-white";
      case OrderItemStatus.DONE:
        return "bg-blue-500 text-white";
      case OrderItemStatus.REJECTED:
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusLabel = (status: OrderItemStatus) => {
    switch (status) {
      case OrderItemStatus.PENDING:
        return "En attente";
      case OrderItemStatus.ACCEPTED:
        return "Terminé";
      case OrderItemStatus.DONE:
        return "Fait";
      case OrderItemStatus.REJECTED:
        return "Refusé";
      default:
        return "Inconnu";
    }
  };

  const getPackagingLabel = (packaging: PackagingType) => {
    switch (packaging) {
      case PackagingType.BOTTLE:
        return "Bouteille";
      case PackagingType.JAR:
        return "Pot";
      case PackagingType.TUBE:
        return "Tube";
      case PackagingType.BOX:
        return "Boîte";
      case PackagingType.OTHER:
        return "Autre";
      default:
        return "Non spécifié";
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

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getOrderStatusInfo = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.FORMULA_PENDING:
        return {
          label: "En attente",
          description: "Votre commande est en attente de validation",
          color: "bg-yellow-500",
          icon: Clock,
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-700",
          borderColor: "border-yellow-200"
        };
      case OrderStatus.FORMULA_ACCEPTED:
        return {
          label: "Validé",
          description: "Votre formule a été acceptée et validée",
          color: "bg-green-500",
          icon: CheckCircle2,
          bgColor: "bg-green-50",
          textColor: "text-green-700",
          borderColor: "border-green-200"
        };
      case OrderStatus.FORMULA_REJECTED:
        return {
          label: "Refusé",
          description: "La formule a été rejetée",
          color: "bg-red-500",
          icon: XCircle,
          bgColor: "bg-red-50",
          textColor: "text-red-700",
          borderColor: "border-red-200"
        };
      case OrderStatus.CANCELLED:
        return {
          label: "Annulé",
          description: "Cette commande a été annulée",
          color: "bg-gray-500",
          icon: AlertCircle,
          bgColor: "bg-gray-50",
          textColor: "text-gray-700",
          borderColor: "border-gray-200"
        };
      default:
        return {
          label: "Inconnu",
          description: "Statut inconnu",
          color: "bg-gray-500",
          icon: AlertCircle,
          bgColor: "bg-gray-50",
          textColor: "text-gray-700",
          borderColor: "border-gray-200"
        };
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      toast.error("Le commentaire ne peut pas être vide");
      return;
    }

    startTransition(async () => {
      const result = await addOrderCommentAction(order.id, newComment);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (result.success && result.data) {
        // Add the new comment to the order
        setOrder(prev => ({
          ...prev,
          comments: [...prev.comments, result.data]
        }));
        setNewComment("");
        toast.success("Commentaire ajouté avec succès");
      }
    });
  };

  const filteredOrderItems = order.orderItems.filter(item => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.product.name.toLowerCase().includes(searchLower) ||
      item.product.supplier?.companyName?.toLowerCase().includes(searchLower)
    );
  });

  const renderFormula = (formula: string) => {
    if (!formula) return <p className="text-gray-500">Aucune formulation</p>;

    const lines = formula.split('\n');
    return (
      <div className="space-y-2">
        {lines.map((line, index) => (
          <div key={index} className="text-sm text-gray-700">
            {line.startsWith('•') ? (
              <div className="flex items-start gap-2 ml-4">
                <span className="text-red-500">•</span>
                <span>{line.substring(1).trim()}</span>
              </div>
            ) : line.match(/^\d+\./) ? (
              <div className="font-semibold mt-3">{line}</div>
            ) : (
              <div>{line}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F4EF] via-white to-[#F7F4EF]">
      <div className="max-w-[1400px] mx-auto p-6 space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <Link href="/customer/orders">
            <Button variant="ghost" size="sm" className="gap-2 hover:bg-white">
              <ChevronLeft className="w-4 h-4" />
              Retour
            </Button>
          </Link>
          <div className="h-6 w-px bg-gray-300" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Détails de la commande</h1>
            <p className="text-sm text-gray-500">Référence: {order.reference || order.id.substring(0, 8).toUpperCase()}</p>
          </div>
        </div>

        {/* Order Status Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            {/* Current Status */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className={`${getOrderStatusInfo(order.status).bgColor} p-3 rounded-xl ${getOrderStatusInfo(order.status).borderColor} border-2`}>
                  {(() => {
                    const StatusIcon = getOrderStatusInfo(order.status).icon;
                    return <StatusIcon className={`w-6 h-6 ${getOrderStatusInfo(order.status).textColor}`} />;
                  })()}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Statut: {getOrderStatusInfo(order.status).label}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {getOrderStatusInfo(order.status).description}
                  </p>
                </div>
              </div>
              <Badge className={`${getOrderStatusInfo(order.status).color} text-white px-4 py-2 text-sm font-semibold shadow-sm`}>
                {getOrderStatusInfo(order.status).label}
              </Badge>
            </div>

            {/* Progress Timeline */}
            {(order.status === OrderStatus.FORMULA_PENDING || order.status === OrderStatus.FORMULA_ACCEPTED) && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  {/* Step 1: En attente */}
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      order.status === OrderStatus.FORMULA_PENDING || order.status === OrderStatus.FORMULA_ACCEPTED
                        ? 'bg-yellow-500 text-white shadow-md'
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                      <Clock className="w-5 h-5" />
                    </div>
                    <p className={`text-xs font-medium mt-2 ${
                      order.status === OrderStatus.FORMULA_PENDING || order.status === OrderStatus.FORMULA_ACCEPTED
                        ? 'text-yellow-700'
                        : 'text-gray-400'
                    }`}>
                      En attente
                    </p>
                  </div>

                  {/* Connector Line 1 */}
                  <div className={`h-1 flex-1 mx-2 rounded-full ${
                    order.status === OrderStatus.FORMULA_ACCEPTED
                      ? 'bg-green-500'
                      : 'bg-gray-200'
                  }`} />

                  {/* Step 2: Validé */}
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      order.status === OrderStatus.FORMULA_ACCEPTED
                        ? 'bg-green-500 text-white shadow-md'
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <p className={`text-xs font-medium mt-2 ${
                      order.status === OrderStatus.FORMULA_ACCEPTED
                        ? 'text-green-700'
                        : 'text-gray-400'
                    }`}>
                      Validé
                    </p>
                  </div>

                  {/* Connector Line 2 */}
                  <div className={`h-1 flex-1 mx-2 rounded-full bg-gray-200`} />

                  {/* Step 3: Terminé */}
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-400">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-medium mt-2 text-gray-400">
                      Terminé
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Rejected/Cancelled Status */}
            {(order.status === OrderStatus.FORMULA_REJECTED || order.status === OrderStatus.CANCELLED) && (
              <div className={`${getOrderStatusInfo(order.status).bgColor} ${getOrderStatusInfo(order.status).borderColor} border-2 rounded-lg p-4`}>
                <div className="flex items-center gap-3">
                  {(() => {
                    const StatusIcon = getOrderStatusInfo(order.status).icon;
                    return <StatusIcon className={`w-5 h-5 ${getOrderStatusInfo(order.status).textColor}`} />;
                  })()}
                  <p className={`text-sm font-medium ${getOrderStatusInfo(order.status).textColor}`}>
                    {order.status === OrderStatus.FORMULA_REJECTED
                      ? "La formule nécessite des ajustements. Veuillez contacter votre fournisseur."
                      : "Cette commande a été annulée et ne sera pas traitée."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cost Summary Card */}
            <div className="bg-gradient-to-br from-[#166970] to-[#1a7a82] rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">Devis estimé total</p>
                  <h2 className="text-4xl font-bold">{order.estimatedTotalCost.toFixed(2)} €</h2>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20 flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 opacity-80" />
                <span className="opacity-90">Créé le {formatDate(order.createdAt)}</span>
              </div>
            </div>

            {/* Product Details Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#166970]" />
                  Informations du produit
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#166970]" />
                        Type de produit
                      </label>
                      <p className="text-gray-900 font-medium pl-3.5">{order.finalResultFamily || "Non spécifié"}</p>
                    </div>

                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#166970]" />
                        Nom du produit
                      </label>
                      <p className="text-gray-900 font-medium pl-3.5">{order.finalResultName || "Non spécifié"}</p>
                    </div>

                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                        <Target className="w-4 h-4 text-[#166970]" />
                        Marché cible
                      </label>
                      <p className="text-gray-900 font-medium pl-6">{order.targetMarket || "Non spécifié"}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                        <TrendingUp className="w-4 h-4 text-[#166970]" />
                        Angle marketing
                      </label>
                      <p className="text-gray-900 font-medium pl-6">{order.marketingAngle || "Non spécifié"}</p>
                    </div>

                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                        <Layers className="w-4 h-4 text-[#166970]" />
                        Quantité souhaitée
                      </label>
                      <p className="text-gray-900 font-medium pl-6">{order.finalResultQuantity} kg</p>
                    </div>

                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                        <Package className="w-4 h-4 text-[#166970]" />
                        Emballage
                      </label>
                      <p className="text-gray-900 font-medium pl-6">{getPackagingLabel(order.packagingType)}</p>
                    </div>
                  </div>
                </div>

                {order.provider && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-transparent p-4 rounded-lg">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Prestataire assigné</p>
                        <p className="font-semibold text-gray-900">{order.provider.name}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Formula Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-50 to-white px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-purple-600" />
                  Formulation
                </h3>
              </div>
              <div className="p-6">
                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg border border-gray-200">
                  {renderFormula(order.formula)}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Internal Notes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-fit sticky top-6">
            <div className="bg-gradient-to-r from-teal-50 to-white px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <div className="bg-[#166970] p-1.5 rounded-lg">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                Notes internes
              </h2>
              <p className="text-xs text-gray-500 mt-1">{order.comments.length} note{order.comments.length !== 1 ? 's' : ''}</p>
            </div>

            {/* Comments List */}
            <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
              {order.comments.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm">Aucune note interne</p>
                  <p className="text-xs text-gray-400 mt-1">Commencez par ajouter une note ci-dessous</p>
                </div>
              ) : (
                order.comments.map((comment, index) => (
                  <div key={comment.id} className="group">
                    <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#166970] to-[#1a7a82] flex items-center justify-center flex-shrink-0 shadow-sm">
                          <span className="text-white font-semibold text-sm">
                            {comment.user.customer?.companyName?.charAt(0) || comment.user.email.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        {index !== order.comments.length - 1 && (
                          <div className="absolute top-10 left-5 w-px h-full bg-gray-200" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm text-gray-900 truncate">
                            {comment.user.customer?.companyName || comment.user.email}
                          </span>
                          <span className="text-xs text-gray-400 flex-shrink-0">
                            {formatTime(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Input */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Ajouter une note..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleAddComment();
                    }
                  }}
                  className="flex-1 border-gray-200 focus:border-[#166970] focus:ring-[#166970]"
                  disabled={isPending}
                />
                <Button
                  onClick={handleAddComment}
                  disabled={isPending || !newComment.trim()}
                  className="bg-gradient-to-r from-[#166970] to-[#1a7a82] hover:from-[#145a61] hover:to-[#166970] text-white rounded-lg px-4 shadow-sm transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-50 to-white px-6 py-5 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <div className="bg-orange-100 p-1.5 rounded-lg">
                    <ShoppingBag className="w-5 h-5 text-orange-600" />
                  </div>
                  Lignes de commande
                </h2>
                <p className="text-sm text-gray-500 mt-1">{filteredOrderItems.length} article{filteredOrderItems.length !== 1 ? 's' : ''}</p>
              </div>

              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full sm:w-64 border-gray-200 focus:border-[#166970] focus:ring-[#166970]"
                  />
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowFilters(!showFilters)}
                  className="border-gray-200 hover:bg-gray-50"
                >
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                  <TableHead className="font-semibold text-gray-700 py-4">Fournisseur</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4">Email</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4">Matière première</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4">Quantité</TableHead>
                  <TableHead className="font-semibold text-gray-700 py-4">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrderItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-3">
                          <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">Aucun article trouvé</p>
                        <p className="text-sm text-gray-400 mt-1">Essayez de modifier votre recherche</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrderItems.map((item, index) => (
                    <TableRow
                      key={item.id}
                      className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                      }`}
                    >
                      <TableCell className="py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#166970] to-[#1a7a82] flex items-center justify-center shadow-sm">
                            <span className="text-xs font-bold text-white">
                              {item.product.supplier?.companyName?.substring(0, 2).toUpperCase() || "??"}
                            </span>
                          </div>
                          <span className="font-semibold text-gray-900">
                            {item.product.supplier?.companyName || "Non spécifié"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-5">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{item.product.supplier?.user?.email || "Non disponible"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-5">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-900">{item.product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-5">
                        <div className="flex items-center gap-2">
                          <Layers className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-900">{item.quantity} kg</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-5">
                        <Badge
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${getStatusBadgeStyle(item.status)}`}
                        >
                          {getStatusLabel(item.status)}
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
    </div>
  );
}
