"use server";

import { getTokens } from "@/lib/cookies-storage";

export interface SupplierOrderItem {
  id: string;
  product: {
    id: string;
    name: string;
    picture: string;
  };
  supplier: {
    id: string;
    companyName: string;
    siretNumber: string;
    picture: string;
    website: string;
    activityDescription: string;
  };
  customer: {
    id: string;
    companyName: string;
    nameOfContact: string;
    phoneNumber: string;
    purchaseObjective: string;
    picture: string;
  };
  quantity: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}



export async function getSupplierOrdersAction() {
  try {
    const tokens = await getTokens();
    
    if (!tokens?.accessToken) {
      return {
        error: "Token d'authentification manquant",
      };
    }

    const response = await fetch(`${process.env.API_BASE_URL}/order/supplier`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokens.accessToken}`,
      },
    });

    const orders: SupplierOrderItem[] = await response.json();

    console.log('supplier orders', JSON.stringify(orders, null, 2));

    return {
      success: true,
      data: orders,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Erreur de connexion au serveur",
    };
  }
}
