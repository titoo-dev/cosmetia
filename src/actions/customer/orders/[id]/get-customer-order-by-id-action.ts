"use server";

import { getTokens } from "@/lib/cookies-storage";
import { OrderEntity } from "@/lib/types/types";

export async function getCustomerOrderByIdAction(orderId: string) {
  try {
    const tokens = await getTokens();

    if (!tokens?.accessToken) {
      return {
        error: "Token d'authentification manquant",
      };
    }

    const response = await fetch(`${process.env.API_BASE_URL}/order/customer/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokens.accessToken}`,
      },
    });

    console.log('RESPONSE', JSON.stringify(response, null, 2));

    if (response.status !== 200) {
      return {
        error: "Commande introuvable",
      };
    }

    const order: OrderEntity = await response.json();

    console.log('ORDER', JSON.stringify(order, null, 2));

    return {
      success: true,
      data: order,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Erreur de connexion au serveur",
    };
  }
}
