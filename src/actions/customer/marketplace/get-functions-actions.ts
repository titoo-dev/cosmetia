"use server";

import { ProductFunctionEntity } from "@/lib/types/types";

export async function getFunctions(): Promise<ProductFunctionEntity[]> {
    try {
        const response = await fetch(`${process.env.API_BASE_URL}/product/customer/filter/functions`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        const functions = await response.json();
        return functions;
    } catch (error) {
        console.error("Error fetching functions:", error);
        return [];
    }
}
