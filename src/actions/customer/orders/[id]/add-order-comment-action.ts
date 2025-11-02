"use server";

import { getTokens } from "@/lib/cookies-storage";
import { OrderCommentEntity } from "@/lib/types/types";

export async function addOrderCommentAction(orderId: string, content: string) {
  try {
    const tokens = await getTokens();

    if (!tokens?.accessToken) {
      return {
        error: "Token d'authentification manquant",
      };
    }

    const response = await fetch(`${process.env.API_BASE_URL}/order/${orderId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokens.accessToken}`,
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      return {
        error: "Erreur lors de l'ajout du commentaire",
      };
    }

    const comment: OrderCommentEntity = await response.json();

    return {
      success: true,
      data: comment,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Erreur de connexion au serveur",
    };
  }
}
