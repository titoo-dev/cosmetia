"use server";

import { getTokens } from "@/lib/cookies-storage";
import { ProductEntity } from "@/lib/types/types";


export async function getSupplierProducts(): Promise<ProductEntity[]> {
  try {
    const tokens = await getTokens();

    if (!tokens?.accessToken) {
      return [];
    }

    const url = `${process.env.API_BASE_URL}/product/supplier/my-products`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${tokens.accessToken}`,
      },
      cache: "no-store",
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products = await response.json();

    return products;
  } catch (error) {
    console.error("Error fetching supplier products:", error);
    throw new Error("Failed to fetch supplier products");
  }
}
