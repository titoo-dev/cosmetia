"use server";

import { getTokens } from "@/lib/cookies-storage";
import { LeadEntity, LeadContext } from "@/lib/types/types";

export interface LeadWithDetails {
  id: string;
  context: LeadContext;
  customerCompanyName: string;
  customerEmail: string;
  date: Date;
  ipAddress: string;
  contextLabel: string;
  productName?: string;
}

export interface LeadsResponse {
  leads: LeadWithDetails[];
  total: number;
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

export async function getSupplierLeadsAction(
  searchQuery?: string,
  page: number = 1,
  limit: number = 50
): Promise<LeadsResponse> {
  try {
    const tokens = await getTokens();
    
    if (!tokens?.accessToken) {
      return {
        leads: [],
        total: 0,
      };
    }

    // Build query parameters
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (searchQuery) {
      params.append("search", searchQuery);
    }

    const response = await fetch(`${process.env.API_BASE_URL}/lead?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokens.accessToken}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch leads:", response.status, response.statusText);
      return {
        leads: [],
        total: 0,
      };
    }

    const data = await response.json();
    console.log('Leads data:', JSON.stringify(data, null, 2));

    // Transform the API response to match our interface
    const leads: LeadWithDetails[] = (data.leads || data || []).map((lead: LeadEntity) => ({
      id: lead.id,
      context: lead.context,
      customerCompanyName: lead.customer?.companyName || "Entreprise inconnue",
      customerEmail: lead.customer?.user?.email || "Email non disponible",
      date: new Date(lead.createdAt),
      ipAddress: "Non disponible", // This would need to be added to the API response
      contextLabel: getContextLabel(lead.context),
      productName: lead.product?.name || (lead.context === LeadContext.VISIT_PROFILE ? "Profil" : "Non spécifié"),
    }));

    return {
      leads,
      total: data.total || leads.length,
    };
  } catch (error) {
    console.error("Error fetching supplier leads:", error);
    return {
      leads: [],
      total: 0,
    };
  }
}
