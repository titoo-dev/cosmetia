"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Mail, Phone, Target, Package, FileText, MapPin, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { LeadDetailResponse } from "@/actions/supplier/dashboard/get-lead-by-id-action";

const getCompanyInitials = (companyName: string) => {
  return companyName
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

interface LeadDetailClientProps {
  lead: LeadDetailResponse;
}

export function LeadDetailClient({ lead }: LeadDetailClientProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F4EF] via-white to-[#F7F4EF]">
      <div className="max-w-[1400px] mx-auto p-6 space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <Link href="/supplier/dashboard">
            <Button variant="ghost" size="sm" className="gap-2 hover:bg-white">
              <ChevronLeft className="w-4 h-4" />
              Retour
            </Button>
          </Link>
          <div className="h-6 w-px bg-gray-300" />
          <div className="flex-1 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Détails du lead</h1>
              <p className="text-sm text-gray-500">
                Créé le {formatDate(lead.date)}
              </p>
            </div>
            <Badge className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 shadow-sm">
              {lead.contextLabel}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-50 to-white px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <div className="bg-purple-100 p-1.5 rounded-lg">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                  Informations de l'acheteur
                </h3>
              </div>

              <div className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#166970] to-[#1a7a82] flex items-center justify-center shadow-sm flex-shrink-0">
                    <span className="text-white font-bold text-xl">
                      {getCompanyInitials(lead.customerCompanyName)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {lead.customerCompanyName}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-lg">
                          <Mail className="w-4 h-4 text-gray-600" />
                        </div>
                        <a
                          href={`mailto:${lead.customerEmail}`}
                          className="text-gray-700 hover:text-[#166970] hover:underline transition-colors"
                        >
                          {lead.customerEmail}
                        </a>
                      </div>
                      {lead.customerPhoneNumber && (
                        <div className="flex items-center gap-3">
                          <div className="bg-gray-100 p-2 rounded-lg">
                            <Phone className="w-4 h-4 text-gray-600" />
                          </div>
                          <a
                            href={`tel:${lead.customerPhoneNumber}`}
                            className="text-gray-700 hover:text-[#166970] hover:underline transition-colors"
                          >
                            {lead.customerPhoneNumber}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {lead.customerPurchaseObjective && (
                  <div className="pt-6 border-t border-gray-200">
                    <div className="bg-gradient-to-r from-blue-50 to-transparent p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Target className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-700 mb-2">
                            Objectif d'achat
                          </p>
                          <p className="text-gray-600 leading-relaxed">
                            {lead.customerPurchaseObjective}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Product Information Card (if applicable) */}
            {lead.productName && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-50 to-white px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <div className="bg-orange-100 p-1.5 rounded-lg">
                      <Package className="w-5 h-5 text-orange-600" />
                    </div>
                    Produit consulté
                  </h3>
                </div>

                <div className="p-6 space-y-4">
                  <div className="group">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#166970]" />
                      Nom commercial
                    </label>
                    <p className="text-lg font-semibold text-[#166970] pl-3.5">
                      {lead.productTradeName || lead.productName}
                    </p>
                  </div>

                  {lead.productInciName && (
                    <div className="group">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#166970]" />
                        Nom INCI
                      </label>
                      <p className="text-gray-900 font-medium pl-3.5">
                        {lead.productInciName}
                      </p>
                    </div>
                  )}

                  {lead.productDescription && (
                    <div className="group pt-4 border-t border-gray-200">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                        <FileText className="w-4 h-4 text-[#166970]" />
                        Description
                      </label>
                      <p className="text-gray-700 leading-relaxed pl-6">
                        {lead.productDescription}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Activity Context Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-teal-50 to-white px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <div className="bg-teal-100 p-1.5 rounded-lg">
                    <FileText className="w-5 h-5 text-teal-600" />
                  </div>
                  Contexte de l'activité
                </h3>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-transparent p-4 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Type d'interaction
                  </p>
                  <Badge className="px-3 py-1.5 rounded-full text-sm font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-sm">
                    {lead.contextLabel}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <Calendar className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        Date de l'activité
                      </p>
                      <p className="text-gray-600 text-sm">
                        {formatDate(lead.date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <MapPin className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        Adresse IP
                      </p>
                      <p className="text-gray-600 text-sm">
                        {lead.ipAddress}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-fit sticky top-6">
              <div className="bg-gradient-to-r from-green-50 to-white px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Actions rapides
                </h3>
                <p className="text-xs text-gray-500 mt-1">Contactez l'acheteur</p>
              </div>
              <div className="p-4 space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-[#166970] to-[#1a7a82] hover:from-[#145a61] hover:to-[#166970] text-white rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
                  onClick={() => window.location.href = `mailto:${lead.customerEmail}`}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Envoyer un email
                </Button>

                {lead.customerPhoneNumber && (
                  <Button
                    variant="outline"
                    className="w-full border-[#166970] text-[#166970] hover:bg-[#166970] hover:text-white transition-all duration-200"
                    onClick={() => window.location.href = `tel:${lead.customerPhoneNumber}`}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Appeler
                  </Button>
                )}
              </div>

              {/* Lead Summary */}
              <div className="bg-gradient-to-br from-[#166970] to-[#1a7a82] p-6 text-white">
                <h3 className="text-lg font-semibold mb-4">
                  Résumé du lead
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <span className="text-sm opacity-90">Entreprise</span>
                    <span className="font-semibold text-right truncate ml-2">{lead.customerCompanyName}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-white/20">
                    <span className="text-sm opacity-90">Type</span>
                    <span className="font-semibold">{lead.contextLabel}</span>
                  </div>
                  {lead.productName && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm opacity-90">Produit</span>
                      <span className="font-semibold truncate ml-2 text-right">
                        {lead.productName}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
