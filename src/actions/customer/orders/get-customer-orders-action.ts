"use server";

import { getTokens } from "@/lib/cookies-storage";
import { OrderEntity } from "@/lib/types/types";

export async function getCustomerOrdersAction() {
  try {
    const tokens = await getTokens();
    
    if (!tokens?.accessToken) {
      return {
        error: "Token d'authentification manquant",
      };
    }

    const response = await fetch(`${process.env.API_BASE_URL}/order/customer`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokens.accessToken}`,
      },
    });

    const orders: OrderEntity[] = await response.json();

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
