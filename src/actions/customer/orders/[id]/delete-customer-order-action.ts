"use server";

import { getAccessToken } from "@/lib/cookies-storage";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteCustomerOrderAction(orderId: string) {
    try {
        const accessToken = await getAccessToken();
        
        if (!accessToken) {
            return null;
        }

        const response = await fetch(`${process.env.API_BASE_URL}/order/customer/${orderId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        console.log('DELETE ORDER RESPONSE', response);

        if (response.status !== 200) {
            throw new Error(`Failed to delete order: ${response.statusText}`);
        }

        revalidatePath("/customer/orders");
        
    } catch (error) {
        console.error("Error deleting customer order:", error);
        throw new Error("Failed to delete order");
    }
    
    redirect("/customer/orders");
}
