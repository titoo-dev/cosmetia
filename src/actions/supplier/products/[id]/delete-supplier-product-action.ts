"use server";

import { getAccessToken } from "@/lib/cookies-storage";
import { revalidatePath } from "next/cache";

export async function deleteSupplierProductAction(productId: string) {
    try {
        const accessToken = await getAccessToken();
        
        if (!accessToken) {
            return null;
        }

        const response = await fetch(`${process.env.API_BASE_URL}/product/supplier/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        console.log('DELETE PRODUCT RESPONSE', response);

        if (response.status !== 200) {
            throw new Error(`Failed to delete product: ${response.statusText}`);
        }

    } catch (error) {
        console.error("Error deleting supplier product:", error);
        throw new Error("Failed to delete product");
    } finally {
        revalidatePath("/supplier/products");
    }
}
