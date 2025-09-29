"use server";

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

export async function getSupplierLeadsAction(
  searchQuery?: string,
  page: number = 1,
  limit: number = 10
): Promise<LeadsResponse> {
  // TODO: Implement actual database queries
  // For now, returning mock data based on the image
  
  const mockLeads: LeadWithDetails[] = [
    {
      id: "1",
      context: LeadContext.VISIT_PROFILE,
      customerCompanyName: "Avon Products",
      customerEmail: "debbie.baker@example.com",
      date: new Date("2019-12-07T23:26:00"),
      ipAddress: "1956 Coler Avanue #23B",
      contextLabel: "Visite d'un profil",
      productName: "Profil",
    },
    {
      id: "2",
      context: LeadContext.RESEARCH_RESULT,
      customerCompanyName: "Baker Hughes Incorpora",
      customerEmail: "debra.holt@example.com",
      date: new Date("2019-03-20T23:14:00"),
      ipAddress: "198 Billy Avanue #56H",
      contextLabel: "Résultat de la recherche",
      productName: "Huile d'argan",
    },
    {
      id: "3",
      context: LeadContext.VISIT_PRODUCT,
      customerCompanyName: "NCR Corporation",
      customerEmail: "michelle.rivera@example.com",
      date: new Date("2019-02-02T19:28:00"),
      ipAddress: "879 Looky street #12C",
      contextLabel: "Vue d'un produit",
      productName: "Huile de coco",
    },
    {
      id: "4",
      context: LeadContext.VISIT_DOCUMENT,
      customerCompanyName: "Acme Co.",
      customerEmail: "jessica.hanson@example.com",
      date: new Date("2019-12-07T23:26:00"),
      ipAddress: "1956 Coler Avanue #23B",
      contextLabel: "Lecture d'un document",
      productName: "Fiche Huile d'argan",
    },
    {
      id: "5",
      context: LeadContext.VISIT_PRODUCT,
      customerCompanyName: "Acme Co.",
      customerEmail: "jessica.hanson@example.com",
      date: new Date("2019-03-20T23:14:00"),
      ipAddress: "1956 Coler Avanue #23B",
      contextLabel: "Vue d'un produit",
      productName: "Glycérine végétale",
    },
    {
      id: "6",
      context: LeadContext.VISIT_PRODUCT,
      customerCompanyName: "Warephase",
      customerEmail: "tranthuy.nute@gmail.com",
      date: new Date("2019-12-07T23:26:00"),
      ipAddress: "198 Billy Avanue #56H",
      contextLabel: "Vue d'un produit",
      productName: "Glycérine végétale",
    },
    {
      id: "7",
      context: LeadContext.VISIT_DOCUMENT,
      customerCompanyName: "Nam-zim",
      customerEmail: "vuhaituongnute@gmail.com",
      date: new Date("2019-02-02T19:28:00"),
      ipAddress: "1978 Jasper Avanue #22",
      contextLabel: "Lecture d'un document",
      productName: "Formule karité",
    },
    {
      id: "8",
      context: LeadContext.VISIT_PRODUCT,
      customerCompanyName: "year-job",
      customerEmail: "tranthuy.nute@gmail.com",
      date: new Date("2019-12-07T23:26:00"),
      ipAddress: "879 Looky street #12C",
      contextLabel: "Vue d'un produit",
      productName: "Glycérine végétale",
    },
    {
      id: "9",
      context: LeadContext.VISIT_PROFILE,
      customerCompanyName: "Toughzap",
      customerEmail: "thuhang.nute@gmail.com",
      date: new Date("2019-12-30T05:18:00"),
      ipAddress: "1956 Coler Avanue #23B",
      contextLabel: "Visite d'un profil",
      productName: "Profil",
    },
  ];

  // Filter leads based on search query
  let filteredLeads = mockLeads;
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredLeads = mockLeads.filter(
      (lead) =>
        lead.customerCompanyName.toLowerCase().includes(query) ||
        lead.customerEmail.toLowerCase().includes(query) ||
        lead.productName?.toLowerCase().includes(query) ||
        lead.contextLabel.toLowerCase().includes(query)
    );
  }

  // Paginate results
  const startIndex = (page - 1) * limit;
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + limit);

  return {
    leads: paginatedLeads,
    total: filteredLeads.length,
  };
}
