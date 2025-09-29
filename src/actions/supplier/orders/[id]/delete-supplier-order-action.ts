"use server";

import { getTokens } from "@/lib/cookies-storage";

export async function deleteSupplierOrderAction(orderId: string) {
  try {
    const tokens = await getTokens();
    
    if (!tokens?.accessToken) {
      throw new Error("Token d'authentification manquant");
    }

    const response = await fetch(`${process.env.API_BASE_URL}/order/supplier/${orderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokens.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de la commande");
    }

    return {
      success: true,
      message: "Commande supprimée avec succès",
    };
  } catch (error) {
    console.error("Error deleting supplier order:", error);
    throw new Error(error instanceof Error ? error.message : "Erreur lors de la suppression de la commande");
  }
}
