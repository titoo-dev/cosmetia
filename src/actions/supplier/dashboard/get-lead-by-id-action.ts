"use server";

import { getTokens } from "@/lib/cookies-storage";
import { LeadEntity, LeadContext } from "@/lib/types/types";

export interface LeadDetailResponse {
  id: string;
  context: LeadContext;
  contextLabel: string;
  customerCompanyName: string;
  customerEmail: string;
  customerPhoneNumber?: string;
  customerPurchaseObjective?: string;
  date: Date;
  ipAddress: string;
  productName?: string;
  productTradeName?: string;
  productDescription?: string;
  productInciName?: string;
}

const getContextLabel = (context: LeadContext): string => {
  switch (context) {
    case LeadContext.VISIT_PROFILE:
      return "Visite d'un profil";
    case LeadContext.VISIT_PRODUCT:
      return "Vue d'un produit";
    case LeadContext.VISIT_DOCUMENT:
      return "Lecture d'un document";
    case LeadContext.RESEARCH_RESULT:
      return "Résultat de la recherche";
    default:
      return "Activité inconnue";
  }
};

export async function getLeadByIdAction(
  leadId: string
): Promise<{ success: boolean; lead?: LeadDetailResponse; error?: string }> {
  try {
    const tokens = await getTokens();

    if (!tokens?.accessToken) {
      return {
        success: false,
        error: "Non authentifié",
      };
    }

    const response = await fetch(`${process.env.API_BASE_URL}/lead/${leadId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokens.accessToken}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch lead:", response.status, response.statusText);
      return {
        success: false,
        error: `Erreur lors de la récupération du lead: ${response.statusText}`,
      };
    }

    const lead: LeadEntity = await response.json();

    // Transform the API response to match our interface
    const leadDetail: LeadDetailResponse = {
      id: lead.id,
      context: lead.context,
      contextLabel: getContextLabel(lead.context),
      customerCompanyName: lead.customer?.companyName || "Entreprise inconnue",
      customerEmail: lead.customer?.user?.email || "Email non disponible",
      customerPhoneNumber: lead.customer?.phoneNumber,
      customerPurchaseObjective: lead.customer?.purchaseObjective,
      date: new Date(lead.createdAt),
      ipAddress: "Non disponible", // This would need to be added to the API response
      productName: lead.product?.name || (lead.context === LeadContext.VISIT_PROFILE ? "Profil" : undefined),
      productTradeName: lead.product?.name,
      productDescription: lead.product?.description,
      productInciName: lead.product?.inciName,
    };

    return {
      success: true,
      lead: leadDetail,
    };
  } catch (error) {
    console.error("Error fetching lead by ID:", error);
    return {
      success: false,
      error: "Une erreur est survenue lors de la récupération du lead",
    };
  }
}
