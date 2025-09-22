"use server";

import { ProductCategoryEntity } from "@/lib/types/types";

export async function getCategories(): Promise<ProductCategoryEntity[]> {
    try {
        const response = await fetch(`${process.env.API_BASE_URL}/product/customer/filter/categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}
