"use server";

import { getTokens } from "@/lib/cookies-storage";
import { ProductEntity } from "@/lib/types/types";

export async function getSupplierProductDetails(id: string): Promise<ProductEntity | null> {
  try {
    const tokens = await getTokens();

    if (!tokens?.accessToken) {
      return null;
    }

    const url = `${process.env.API_BASE_URL}/product/supplier/${id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokens.accessToken}`,
      },
      cache: "no-store",
    });

    if (response.status !== 200) {
      return null;
    }

    const product = await response.json();

    return product;
  } catch (error) {
    console.error("Error fetching supplier product details:", error);
    return null;
  }
}
