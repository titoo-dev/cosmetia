"use server";

import { getAccessToken } from "@/lib/cookies-storage";
import { SupplierOrderItem } from "@/actions/supplier/orders/get-supplier-orders-action";

const API_BASE_URL = process.env.API_BASE_URL;

interface GetSupplierOrderByIdResponse {
  success: boolean;
  data?: SupplierOrderItem;
  error?: string;
}

export async function getSupplierOrderByIdAction(
  orderId: string
): Promise<GetSupplierOrderByIdResponse> {
  try {
    const token = await getAccessToken();

    if (!token) {
      return { success: false, error: "Non authentifié" };
    }

    const response = await fetch(`${API_BASE_URL}/order/supplier/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      return { success: false, error: "Commande introuvable" };
    }

    const data = await response.json();

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error fetching supplier order:", error);
    return {
      success: false,
      error: "Une erreur est survenue lors de la récupération de la commande",
    };
  }
}
