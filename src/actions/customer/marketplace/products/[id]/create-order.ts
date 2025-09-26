"use server";

import { getTokens } from "@/lib/cookies-storage";
import { z } from "zod";

const createOrderSchema = z.object({
  productId: z.string().min(1, "L'ID du produit est requis"),
  quantity: z.number().min(1, "La quantité doit être supérieure à 0"),
});

type ResponseCreateOrder = {
  message?: string[];
  error?: string;
  statusCode?: number;
}

export async function createOrderAction(prevState: unknown, formData: FormData) {
  const productId = formData.get("productId") as string;
  const quantity = Number(formData.get("quantity"));

  const validatedFields = createOrderSchema.safeParse({
    productId,
    quantity,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Erreur de validation des champs.",
    };
  }

  try {
    const tokens = await getTokens();
    
    if (!tokens?.accessToken) {
      return {
        error: "Token d'authentification manquant",
      };
    }

    const response = await fetch(`${process.env.API_BASE_URL}/order/customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokens.accessToken}`,
      },
      body: JSON.stringify({
        productId: validatedFields.data.productId,
        quantity: validatedFields.data.quantity,
      }),
    });

    const data: ResponseCreateOrder = await response.json();

    if (data.error) {
      console.log('CREATE ORDER ERROR', data);

      return {
        error: data.error,
      };
    }

    console.log('CREATE ORDER SUCCESS', data);

    return {
      success: true,
      message: "Commande créée avec succès",
      data,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "Erreur de connexion au serveur",
    };
  }
}
